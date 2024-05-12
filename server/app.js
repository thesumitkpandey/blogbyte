import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import usersRoute from "./route/usersRoute.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import xssClean from "xss-clean";

dotenv.config();
const app = express();
app.use(helmet());
app.use(cors());
/*{
  credentials: true,
  origin: process.env.CORS_ORIGIN,
}
*/
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-7",
  legacyHeaders: false,
});

app.use(limiter);
app.get("/", (req, res) => {
  res.status(200).json({
    message: "hello from the server",
  });
});
app.use(express.json({ limit: "1000kb" }));
//Input sanatization
//write email: {"$gt": ""} and correct password and you will be logged in to prevent this we are using input sanitization
app.use(mongoSanitize());
app.use(xssClean());
//uncomment both of above and paste email : {"$gt": ""}

//url encoded and public option left
app.use("/api/v1/users", usersRoute);

app.use(errorMiddleware);
export default app;
