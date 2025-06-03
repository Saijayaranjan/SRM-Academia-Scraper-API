import { Hono } from "hono";
import { cors } from "hono/cors";
import { attendanceHandler } from "./handler/attendance.js";
import { marksHandler } from "./handler/marks.js";
import { courseHandler } from "./handler/course.js";
import { calendarHandler } from "./handler/calendar.js";
import { timetableHandler } from "./handler/timetable.js";
import { userInfoHandler } from "./handler/userInfo.js";
import { tokenMiddleware } from "./utils/middleware.js";
import { userHandler } from "./handler/Auth/user.js";
import { passwordHandler } from "./handler/Auth/password.js";
import { captchaHandler } from "./handler/Auth/captcha.js";
import { logoutHandler } from "./handler/Auth/logout.js";

const app = new Hono();
app.use(
  "*",
  cors({
    origin: "*",
    allowMethods: ["GET", "POST"],
    allowHeaders: ["Content-Type", "Token"],
    allowCredentials: true,
  })
);
app.use("*", tokenMiddleware);

app.post("/api/login/user", (c) => userHandler(c));
app.post("/api/login/password", (c) => passwordHandler(c));
app.post("/api/login/captcha", (c) => captchaHandler(c));
app.get("/api/logout", (c) => logoutHandler(c));
app.get("/api/attendance", (c) => attendanceHandler(c));
app.get("/api/userinfo", (c) => userInfoHandler(c));
app.get("/api/marks", (c) => marksHandler(c));
app.get("/api/course", (c) => courseHandler(c));
app.get("/api/calendar", (c) => calendarHandler(c));
app.get("/api/timetable", (c) => timetableHandler(c));

export default app;
