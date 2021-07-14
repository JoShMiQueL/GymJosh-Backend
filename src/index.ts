import "dotenv/config";
import app from "./routes";
import "./routes/database";
import chalk from "chalk";

app.listen(app.get("port"), () => {
  console.log(
    chalk`{hex('#00A331') Ready {white - started server on {yellow 0.0.0.0:${app.get(
      "port"
    )}}, url: {yellow http://localhost:${app.get("port")}}}}`
  );
});
