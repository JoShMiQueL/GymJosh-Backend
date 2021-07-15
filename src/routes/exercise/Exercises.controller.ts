import { Request, RequestHandler, Response } from "express";
import _ from "lodash";
import { Document } from "mongoose";
import ExerciseModel from "./Exercise.model";

export const updateExercise: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const { inc } = req.headers;
  try {
    if (_.isNaN(Number(id))) return res.sendStatus(400);
    const doc = await ExerciseModel.find({ id });
    if (_.isEmpty(doc)) {
      return res.sendStatus(404);
    }
    if (inc === "1") {
      await ExerciseModel.updateOne({ id }, { $inc: { ...req.body } });
    } else {
      await ExerciseModel.updateOne({ id }, req.body);
    }
    return res.sendStatus(200);
  } catch (error) {
    console.error(error);
  }
};

export const addExercise: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  try {
    if (!_.isNaN(Number(id))) return res.sendStatus(400);
    const doc = await ExerciseModel.find({ name: id });
    if (_.isEmpty(doc)) {
      let lastDoc = await ExerciseModel.find(
        {},
        { _id: 0 },
        { sort: { createdAt: -1 } }
      );
      if (_.isEmpty(lastDoc)) {
        await ExerciseModel.insertMany({ ...req.body, name: id, id: 1 });
        return res.sendStatus(200);
      }
      await ExerciseModel.insertMany({
        ...req.body,
        name: id,
        id: lastDoc[0].id + 1,
      });
      return res.sendStatus(200);
    }
    return res.sendStatus(409);
  } catch (error) {
    console.error(error);
  }
};

export const deleteExercise: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  try {
    if (_.isNaN(Number(id))) return res.sendStatus(400);
    const doc = await ExerciseModel.deleteOne({ id });
    if (doc.ok) {
      return res.status(200).json({
        status: 200,
        statusMessage: "OK",
        deletedDocuments: doc.deletedCount,
      });
    }
    return res.sendStatus(404);
  } catch (error) {
    console.error(error);
  }
};

export const getExercises: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    res.json(await ExerciseModel.find({}, { _id: 0 }));
  } catch (error) {
    console.error(error);
  }
};

export const getExercise: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  try {
    let doc: Document<any, any, unknown>[];
    if (_.isNaN(Number(id))) {
      doc = await ExerciseModel.find({ name: id }, { _id: 0 });
    } else {
      doc = await ExerciseModel.find({ id }, { _id: 0 });
    }
    if (_.isEmpty(doc)) {
      return res.sendStatus(404);
    }
    return res.json(doc[0]);
  } catch (error) {
    console.error(error);
  }
};

export const deleteAllExercises: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const query = await ExerciseModel.deleteMany({});
    if (query.ok) {
      return res.status(200).json({
        status: 200,
        statusMessage: "OK",
        deletedDocuments: query.deletedCount,
      });
    }
    return res.sendStatus(200);
  } catch (error) {
    console.error(error);
  }
};
