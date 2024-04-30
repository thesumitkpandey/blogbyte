import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import usersRoute from "./route/usersRoute.js";
import errorMiddleware from "./middleware/errorMiddleware.js";

dotenv.config();
const app = express();
app.use(
  cors({
    credentials: true,
    origin: process.env.CORS_ORIGIN,
  }),
);
app.get("/", (req, res) => {
  res.status(200).json({
    message: "hello from the server",
  });
});
app.use(express.json({ limit: "1000kb" }));
//url encoded and public option left
app.use("/api/v1/users", usersRoute);

app.use(errorMiddleware);
export default app;
