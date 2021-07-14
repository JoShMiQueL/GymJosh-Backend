import { Schema, model } from "mongoose";

export default model(
  "Exercise",
  new Schema(
    {
      id: {
        type: Number,
        required: true,
      },
      name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
      },
      count: {
        type: Number,
        default: 0,
      },
    },
    { versionKey: false, timestamps: true }
  )
);
