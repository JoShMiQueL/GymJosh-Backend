import { Router } from "express";
import {
  getExercise,
  getExercises,
  updateExercise,
  addExercise,
  deleteAllExercises,
  deleteExercise,
} from "./Exercises.controller";
const router = Router();

router.get("/exercises", getExercises);
router.delete("/exercises", deleteAllExercises);
router.get("/exercises/:id", getExercise);
router.post("/exercises/:id", addExercise);
router.put("/exercises/:id", updateExercise);
router.delete("/exercises/:id", deleteExercise);

export default router;
