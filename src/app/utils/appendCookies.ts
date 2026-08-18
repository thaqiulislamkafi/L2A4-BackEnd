import { Response } from "express";

export const appendCookies = (res: Response, headers: Headers) => {
  const cookies = headers.getSetCookie?.() ?? [];
  cookies.forEach((cookie) => res.append('Set-Cookie', cookie));
};
