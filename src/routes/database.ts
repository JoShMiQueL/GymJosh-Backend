import chalk from "chalk";
import _ from "lodash";
import mongoose, { ConnectOptions } from "mongoose";
const { MONGO_DATABASE, MONGO_HOST, MONGO_USER, MONGO_PASSWORD } = process.env;

(async () => {
  const mongooseOptions: ConnectOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  };

  const mongooseURL = `mongodb://${
    MONGO_PASSWORD ? `${MONGO_USER}:${MONGO_PASSWORD}@` : ""
  }${MONGO_HOST}/${MONGO_DATABASE}`;

  const connectDB = async () => {
    let connected = false;
    let db: typeof mongoose;
    while (!connected) {
      try {
        db = await mongoose.connect(mongooseURL, mongooseOptions);
        if (db.connection) {
          connected = true;
          continue;
        }
        // mongoose.Promise = global.Promise;
        await connectDB();
      } catch (error) {
        // console.error(error);
        console.log(
          chalk`{blue Database} - Could not connect to {yellow ${mongooseURL}}, reconnecting...`
        );
        connected = false;
        mongoose.connection.close();
      }
    }
    console.log(
      chalk`{blue Database} - Connected to {yellow ${mongooseURL}} - {yellow ${
        db!.connection.name
      }} database`
    );
  };

  await connectDB();
})();
