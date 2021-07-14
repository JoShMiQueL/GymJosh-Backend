import chalk from "chalk";
import mongoose, { ConnectOptions } from "mongoose";
import {
  MONGO_DATABASE,
  MONGO_HOST,
  MONGO_USER,
  MONGO_PASSWORD,
} from "./config";

(async () => {
  const mongooseOptions: ConnectOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  };
  const mongooseURL = `mongodb://${
    MONGO_PASSWORD && `${MONGO_USER}:${MONGO_PASSWORD}@`
  }${MONGO_HOST}/${MONGO_DATABASE}`;
  try {
    const db = await mongoose.connect(mongooseURL, mongooseOptions);
    mongoose.Promise = global.Promise;
    console.log(
      chalk`{blue Database {white - Connected to {yellow ${db.connection.name}} database}}`
    );
  } catch (error) {
    console.error(error);
    mongoose.connection.close();
  }
})();
