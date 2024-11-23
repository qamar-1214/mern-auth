import express, { urlencoded } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "../database/db.js";
import router from "../routes/auth.Route.js";
import { errorMiddleware } from "../middlewares/error.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(urlencoded({ extended: true }));
dotenv.config();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(cookieParser());
app.use("/api/user", router);

connectDB();
app.use(errorMiddleware);
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
