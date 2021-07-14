import "./util/environment";
import chalk from "chalk";
import app from "./routes";
import "./routes/database";

app.listen(app.get("port"), () => {
  console.log(
    chalk`{hex('#00A331') Ready {white - started server on {yellow 0.0.0.0:${app.get(
      "port"
    )}}, url: {yellow http://localhost:${app.get("port")}}}}`
  );
});
