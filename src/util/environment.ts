import path from "path";
import root from "../../root";
import fs from "fs";
import _ from "lodash";
import chalk from "chalk";

const envFiles = fs
  .readdirSync(root)
  .filter((v, i) => v.match(/\.(env|env\.*)/));

if (!_.isEmpty(envFiles)) {
  require("dotenv/config");
  require("dotenv").config({
    path: path.join(root, `.env.${process.env.NODE_ENV}`),
  });
  console.log(
    chalk`{hex('#00A331') Environment} - loaded file: {yellow ${`.env.${process.env.NODE_ENV}`}}`
  );
}
