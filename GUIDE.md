
  I understand - you want to create custom Express routes for auth instead of mounting the Better Auth handler. You can use Better Auth's server-side API directly. Here's how:

## Custom Auth Routes with Express + Prisma

### `server.ts`

```typescript
import express, { Request, Response } from "express";
import cors from "cors";
import { fromNodeHeaders } from "better-auth/node";
import { auth } from "./lib/auth";
import { APIError, isAPIError } from "better-auth/api";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());

// ========== CUSTOM AUTH ROUTES ==========

// Sign Up
app.post("/api/auth/sign-up", async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;

    const result = await auth.api.signUpEmail({
      body: { email, password, name },
      headers: new Headers({
        "x-client-ip": req.ip || "",
        "user-agent": req.headers["user-agent"] || "",
      }),
      returnHeaders: true, // To get session cookies
    });

    // Forward set-cookie headers to client
    const cookies = result.headers.getSetCookie();
    cookies.forEach((cookie) => res.append("Set-Cookie", cookie));

    return res.status(201).json({
      success: true,
      user: result.response.user,
    });
  } catch (error) {
    if (isAPIError(error)) {
      return res.status(error.status || 400).json({
        error: error.message,
        code: error.status,
      });
    }
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Sign In
app.post("/api/auth/sign-in", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const result = await auth.api.signInEmail({
      body: { email, password },
      headers: fromNodeHeaders(req.headers),
      returnHeaders: true,
    });

    // Forward set-cookie headers
    const cookies = result.headers.getSetCookie();
    cookies.forEach((cookie) => res.append("Set-Cookie", cookie));

    return res.json({
      success: true,
      session: result.response,
    });
  } catch (error) {
    if (isAPIError(error)) {
      return res.status(error.status || 400).json({
        error: error.message,
      });
    }
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Get Session / Me
app.get("/api/auth/me", async (req: Request, res: Response) => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    return res.json({ user: session.user, session: session.session });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Sign Out
app.post("/api/auth/sign-out", async (req: Request, res: Response) => {
  try {
    await auth.api.signOut({
      headers: fromNodeHeaders(req.headers),
    });

    // Clear cookies (optional - Better Auth handles this)
    res.clearCookie("better-auth.session_token");
    
    return res.json({ success: true });
  } catch (error) {
    if (isAPIError(error)) {
      return res.status(error.status || 400).json({ error: error.message });
    }
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Forgot Password
app.post("/api/auth/forgot-password", async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    await auth.api.forgetPassword({
      body: { email },
    });

    // Always return success (prevents email enumeration)
    return res.json({ 
      success: true, 
      message: "If the email exists, a reset link has been sent" 
    });
  } catch (error) {
    // Still return success to prevent email enumeration attacks
    return res.json({ 
      success: true, 
      message: "If the email exists, a reset link has been sent" 
    });
  }
});

// Reset Password (with token)
app.post("/api/auth/reset-password", async (req: Request, res: Response) => {
  try {
    const { token, newPassword } = req.body;

    await auth.api.resetPassword({
      query: { token },
      body: { newPassword },
    });

    return res.json({ success: true, message: "Password reset successful" });
  } catch (error) {
    if (isAPIError(error)) {
      return res.status(error.status || 400).json({ error: error.message });
    }
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Email Verification
app.post("/api/auth/verify-email", async (req: Request, res: Response) => {
  try {
    const { token } = req.query;

    await auth.api.verifyEmail({
      query: { token: token as string },
    });

    return res.json({ success: true, message: "Email verified successfully" });
  } catch (error) {
    if (isAPIError(error)) {
      return res.status(error.status || 400).json({ error: error.message });
    }
    return res.status(500).json({ error: "Internal server error" });
  }
});

// ========== PROTECTED ROUTES ==========

// Middleware to check authentication
const requireAuth = async (req: Request, res: Response, next: Function) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });
  
  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  
  // Attach user to request for downstream use
  (req as any).user = session.user;
  next();
};

// Protected route example
app.get("/api/protected", requireAuth, (req: Request, res: Response) => {
  res.json({ 
    message: "This is protected data", 
    user: (req as any).user 
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

### `lib/auth.ts`

```typescript
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    sendResetPasswordEmail: async ({ user, url }, req) => {
      // Send reset password email
      console.log(`Send reset password link to ${user.email}: ${url}`);
      // Integrate with your email service (Resend, SendGrid, etc.)
    },
    sendVerificationEmail: async ({ user, url }, req) => {
      // Send verification email
      console.log(`Send verification link to ${user.email}: ${url}`);
    },
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },
});
```

### `lib/auth-client.ts` (Frontend)

```typescript
import { createAuthClient } from "better-auth/client";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000",
});

// Or use regular fetch/axios with your custom endpoints:
// POST /api/auth/sign-up
// POST /api/auth/sign-in  
// POST /api/auth/sign-out
// POST /api/auth/forgot-password
// GET  /api/auth/me
```

## Key Points

| Aspect | Details |
|--------|---------|
| **No handler mounting** | You don't use `toNodeHandler(auth)` |
| **API object** | Access all endpoints via `auth.api.*` |
| **Error handling** | Use `isAPIError()` from `better-auth/api` |
| **Cookies** | Pass `returnHeaders: true` and forward `Set-Cookie` headers |
| **Headers** | Use `fromNodeHeaders(req.headers)` to convert Node headers |

## Available API Methods

- `auth.api.signUpEmail()` - Email/password registration
- `auth.api.signInEmail()` - Email/password login
- `auth.api.signOut()` - Log out user
- `auth.api.getSession()` - Get current session
- `auth.api.forgetPassword()` - Send reset email
- `auth.api.resetPassword()` - Reset with token
- `auth.api.verifyEmail()` - Verify email with token
- `auth.api.changeEmail()` - Change user email
- `auth.api.changePassword()` - Change password
- `auth.api.updateUser()` - Update user info

This approach gives you full control over your API routes while still leveraging Better Auth's core functionality!