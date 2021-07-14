import express from "express";
import morgan from "morgan";
import cors from "cors";
import ExerciseRoute from "./exercise/Exercises.routes";

const app = express();

app.set("port", process.env.SERVER_PORT);

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(ExerciseRoute);

export default app;
