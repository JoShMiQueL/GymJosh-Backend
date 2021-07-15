import path from "path";
import root from "../../root";
import _ from "lodash";
import chalk from "chalk";
const { NODE_ENV } = process.env;
import dotenv, { DotenvConfigOutput } from "dotenv";

let log: DotenvConfigOutput;
let files: string[] = [];

let file = ".env.production";
log = dotenv.config({ path: path.join(root, file) });
if (!log.error) files.push(file);

if (NODE_ENV === "development") {
  file = ".env.development";
  log = dotenv.config({ path: path.join(root, file) });
  if (!log.error) files.push(file);
} else if (NODE_ENV === "test") {
  file = ".env.test";
  log = dotenv.config({ path: path.join(root, file) });
  if (!log.error) files.push(file);
}

console.log(
  chalk`{hex('#00A331') Environment} - {yellow ${
    NODE_ENV!.slice(0, 1).toUpperCase() + NODE_ENV!.slice(1)
  }} ${
    !log.error
      ? chalk`- {yellow ${files}} found! loading${
          files.length! <= 1 ? "" : " respectively"
        }...`
      : ""
  }`
);

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
