import express from "express";
import morgan from "morgan";
import cors from "cors";
import ExerciseRoute from "./exercise/Exercises.routes";
import path from "path";
import root from "../../root";

const app = express();

app.set("view engine", "html");
app.set("port", process.env.PORT || 3001);
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(root, "dist/frontend")));
app.use(ExerciseRoute);

export default app;
