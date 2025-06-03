import { fetchLogout } from "../../fetch/logout.js";

export async function logoutHandler(c) {
  const cookie = await c.req.header("Token");

  if (!cookie) {
    return c.json({ error: "Token is required" }, 400);
  }
  const fetch = await fetchLogout(cookie);

  return c.json({ message: fetch.error }, fetch.status);
}
