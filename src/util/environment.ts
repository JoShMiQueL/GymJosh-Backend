import path from "path";
import root from "../../root";
import _ from "lodash";
import chalk from "chalk";
const { NODE_ENV } = process.env;
import dotenv from "dotenv";

if (NODE_ENV) {
  if (NODE_ENV === "development" || NODE_ENV === "test") {
    dotenv.config({ path: path.join(root, ".env") });
    if (NODE_ENV === "test") {
      dotenv.config({ path: path.join(root, ".env.test") });
    }
  }
  console.log(
    chalk`{hex('#00A331') Environment} - {yellow ${
      NODE_ENV === "test" ? `Test` : "Development"
    }} - loaded file: {yellow ${NODE_ENV === "test" ? `.env.test` : ".env"}}`
  );
}

// const envFiles = fs
//   .readdirSync(root)
//   .filter((v, i) => v.match(/\.(env|env\.*)/));

// if (!_.isEmpty(envFiles)) {
//   require("dotenv/config");
//   require("dotenv").config({
//     path: path.join(root, `.env.${process.env.NODE_ENV}`),
//   });
//   console.log(
//     chalk`{hex('#00A331') Environment} - loaded file: {yellow ${`.env.${process.env.NODE_ENV}`}}`
//   );
// }
