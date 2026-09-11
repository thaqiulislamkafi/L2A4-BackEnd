
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

| Aspect                  | Details                                                     |
| ----------------------- | ----------------------------------------------------------- |
| **No handler mounting** | You don't use `toNodeHandler(auth)`                         |
| **API object**          | Access all endpoints via `auth.api.*`                       |
| **Error handling**      | Use `isAPIError()` from `better-auth/api`                   |
| **Cookies**             | Pass `returnHeaders: true` and forward `Set-Cookie` headers |
| **Headers**             | Use `fromNodeHeaders(req.headers)` to convert Node headers  |

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


  Here's how to set up **password reset with OTP** using the Email OTP plugin in your Prisma + Express + TypeScript server.

## 1. Server-side Setup

```ts title="auth.ts"
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { emailOTP } from "better-auth/plugins";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "sqlite"
  }),
  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        // Determine the email subject based on type
        let subject = "Your verification code";
        if (type === "forget-password") {
          subject = "Reset your password";
        }

        // Send the OTP via your email provider (e.g., Resend, SendGrid, SMTP)
        void sendEmail({
          to: email,
          subject,
          text: `Your OTP code is: ${otp}`,
          // Or use HTML template
          html: `<p>Your OTP code is: <strong>${otp}</strong></p>`,
        });
      },
      otpLength: 6,        // default
      expiresIn: 300,      // 5 minutes in seconds
      allowedAttempts: 3,   // max verification attempts
    }),
  ],
});

// Your email sending function
async function sendEmail({ to, subject, text, html }: any) {
  // Implement with your email provider
  console.log(`Sending OTP ${text} to ${to}`);
}
```

## 2. Express Routes

```ts title="server.ts"
import express from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./auth";

const app = express();

// Mount Better Auth handlers at /api/auth
app.all("/api/auth/*", toNodeHandler(auth));

app.use(express.json());

// Step 1: Request password reset OTP
app.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    // Send forget-password OTP to user's email
    await auth.api.requestPasswordResetEmailOTP({
      body: { email },
    });

    res.json({
      success: true,
      message: "OTP sent to your email",
    });
  } catch (error) {
    // Don't reveal if email exists for security
    res.json({
      success: true,
      message: "If email exists, OTP has been sent",
    });
  }
});

// Step 2: Verify OTP & Reset Password (server-side validation optional)
app.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Optional: Check if OTP is valid before resetting
    const result = await auth.api.checkVerificationOTP({
      body: {
        email,
        type: "forget-password",
        otp,
      },
    });

    res.json({ valid: true });
  } catch (error) {
    res.status(400).json({ valid: false, error });
  }
});

// Step 3: Reset password with OTP
app.post("/reset-password", async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    await auth.api.resetPasswordEmailOTP({
      body: {
        email,
        otp,
        password: newPassword,
      },
    });

    res.json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
```

## 3. Client-side Flow

```ts title="auth-client.ts"
import { createAuthClient } from "better-auth/client";
import { emailOTPClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000",
  plugins: [emailOTPClient()],
});
```

### Step 1: Request OTP
```ts
await authClient.emailOtp.requestPasswordReset({
  email: "user@example.com",
});
```

### Step 2: Reset Password with OTP
```ts
const { data, error } = await authClient.emailOtp.resetPassword({
  email: "user@example.com",
  otp: "123456",
  password: "newSecurePassword123",
});
```

## Key Configuration Options

| Option            | Default    | Description                                |
| ----------------- | ---------- | ------------------------------------------ |
| `otpLength`       | `6`        | Length of OTP                              |
| `expiresIn`       | `300`      | OTP expiry in seconds (5 min)              |
| `allowedAttempts` | `3`        | Max attempts before invalid                |
| `resendStrategy`  | `"rotate"` | `"rotate"` = new OTP, `"reuse"` = same OTP |

## Security Notes

1. **Don't await email sending** - Use `void` to prevent timing attacks
2. **Generic responses** - Always return success even if email doesn't exist
3. **Rate limiting** - Implement rate limiting on OTP endpoints
4. **Allowed attempts** - OTP invalidates after max attempts exceeded

That's it! The Email OTP plugin handles token generation, storage, verification, and expiration automatically.

Here is the complete server-side manual code for changing email with Better Auth, Prisma, and Express:

## 1. Auth Configuration for Email Change

```typescript
// src/lib/auth.ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { emailOTP } from "better-auth/plugins"; // Optional: for OTP-based change
import { prisma } from "./prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  
  // Enable email change feature
  user: {
    changeEmail: {
      enabled: true,
      
      // Require confirmation from current email before changing
      sendChangeEmailConfirmation: async ({ user, newEmail, url, token }, request) => {
        await sendEmail({
          to: user.email, // Current email
          subject: "Approve Email Change",
          text: `Click to approve changing your email to ${newEmail}: ${url}`,
        });
      },
      
      // Allow immediate update if current email is not verified
      updateEmailWithoutVerification: false, // Set true to skip verification
    },
  },
  
  // Required for sending verification to new email
  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }, request) => {
      await sendEmail({
        to: user.email,
        subject: "Verify Your New Email",
        text: `Click to verify: ${url}`,
      });
    },
  },
  
  // Optional: OTP plugin for OTP-based email change
  plugins: [
    emailOTP({
      changeEmail: {
        enabled: true,
        verifyCurrentEmail: true, // Require OTP on current email first
      },
      async sendVerificationOTP({ email, otp, type }) {
        await sendEmail({
          to: email,
          subject: type === "change-email" ? "Confirm Email Change" : "Verification Code",
          text: `Your code: ${otp}`,
        });
      },
    }),
  ],
});
```

## 2. Express Server with Email Change Endpoints

```typescript
// src/server.ts
import express from "express";
import { toNodeHandler, fromNodeHeaders } from "better-auth/node";
import { auth } from "./lib/auth";
import { APIError, isAPIError } from "better-auth/api";
import { prisma } from "./lib/prisma";

const app = express();

app.all("/api/auth/*", toNodeHandler(auth));
app.use(express.json());

// ============================================
// CHANGE EMAIL (SERVER-SIDE)
// ============================================

/**
 * 1. INITIATE EMAIL CHANGE (with verification link)
 * POST /api/change-email
 * 
 * Sends verification email to new address.
 * User must click link to complete change.
 */
app.post("/api/change-email", async (req, res) => {
  try {
    const { newEmail, callbackURL } = req.body;
    
    // Get session from request headers
    const headers = fromNodeHeaders(req.headers);
    
    const result = await auth.api.changeEmail({
      body: {
        newEmail,
        callbackURL: callbackURL || "/dashboard",
      },
      headers, // Session required
    });
    
    res.json({
      success: true,
      message: "Verification email sent to new address",
      user: result,
    });
  } catch (error) {
    if (isAPIError(error)) {
      res.status(error.status).json({
        error: error.message,
        code: error.status,
      });
    } else {
      res.status(500).json({ error: "Failed to initiate email change" });
    }
  }
});

/**
 * 2. CHANGE EMAIL WITH OTP (Email OTP Plugin)
 * POST /api/change-email/otp/request
 * 
 * Step 1: Request OTP for current email verification
 */
app.post("/api/change-email/otp/request-current", async (req, res) => {
  try {
    const { email } = req.body;
    
    // Send OTP to current email
    const result = await auth.api.sendVerificationOTP({
      body: {
        email,
        type: "email-verification",
      },
    });
    
    res.json({
      success: true,
      message: "OTP sent to current email",
    });
  } catch (error) {
    if (isAPIError(error)) {
      res.status(error.status).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Failed to send OTP" });
    }
  }
});

/**
 * Step 2: Request email change after verifying current email
 * POST /api/change-email/otp/request-change
 */
app.post("/api/change-email/otp/request-change", async (req, res) => {
  try {
    const { newEmail, otp } = req.body;
    const headers = fromNodeHeaders(req.headers);
    
    const result = await auth.api.requestEmailChangeEmailOTP({
      body: {
        newEmail,
        otp, // OTP from current email (if verifyCurrentEmail is enabled)
      },
      headers, // Session required
    });
    
    res.json({
      success: true,
      message: "OTP sent to new email address",
    });
  } catch (error) {
    if (isAPIError(error)) {
      res.status(error.status).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Failed to request email change" });
    }
  }
});

/**
 * Step 3: Confirm email change with OTP from new email
 * POST /api/change-email/otp/confirm
 */
app.post("/api/change-email/otp/confirm", async (req, res) => {
  try {
    const { newEmail, otp } = req.body;
    const headers = fromNodeHeaders(req.headers);
    
    const result = await auth.api.changeEmailEmailOTP({
      body: {
        newEmail,
        otp, // OTP sent to new email
      },
      headers, // Session required
    });
    
    res.json({
      success: true,
      message: "Email changed successfully",
      user: result,
    });
  } catch (error) {
    if (isAPIError(error)) {
      res.status(error.status).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Failed to change email" });
    }
  }
});

/**
 * 3. DIRECT EMAIL UPDATE (Admin only - skips verification)
 * POST /api/admin/change-email
 */
app.post("/api/admin/change-email", async (req, res) => {
  try {
    const { userId, newEmail } = req.body;
    
    // Verify admin privileges here!
    // const session = await auth.api.getSession({ headers: fromNodeHeaders(req.headers) });
    // if (!isAdmin(session.user)) return res.status(403).json({ error: "Unauthorized" });
    
    // Direct database update
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        email: newEmail,
        emailVerified: new Date(), // Auto-verify when admin changes
      },
    });
    
    res.json({
      success: true,
      message: "Email updated by admin",
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        emailVerified: updatedUser.emailVerified,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to update email" });
  }
});

/**
 * 4. VERIFY EMAIL CHANGE TOKEN (Manual)
 * GET /api/verify-change-email
 * 
 * Usually handled by /api/auth/verify-email automatically
 */
app.get("/api/verify-change-email", async (req, res) => {
  try {
    const { token, callbackURL } = req.query;
    
    const result = await auth.api.verifyEmail({
      query: {
        token: token as string,
        callbackURL: (callbackURL as string) || "/",
      },
    });
    
    res.json({
      success: true,
      message: "Email verified and updated",
      user: result.user,
    });
  } catch (error) {
    if (isAPIError(error)) {
      res.status(error.status).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Verification failed" });
    }
  }
});

/**
 * 5. GET EMAIL CHANGE STATUS
 * GET /api/email-status
 */
app.get("/api/email-status", async (req, res) => {
  try {
    const headers = fromNodeHeaders(req.headers);
    const session = await auth.api.getSession({ headers });
    
    if (!session) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    
    res.json({
      currentEmail: session.user.email,
      emailVerified: !!session.user.emailVerified,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to get status" });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
```

## 3. Usage Examples

### Standard Email Change (with verification link)

```typescript
// Step 1: Request
```