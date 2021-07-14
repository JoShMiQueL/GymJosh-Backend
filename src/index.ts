// import "./util/environment";
import chalk from "chalk";
import { AddressInfo } from "net";
import app from "./routes";
import { v4 } from "public-ip";
import "./routes/database";

console.log("src/index", process.env.NODE_ENV);

const server = app.listen(app.get("port"), `0.0.0.0`, async () => {
  const host: AddressInfo = Object(server.address());
  console.log(
    chalk`{hex('#00A331') Ready {white - started server on {yellow ${
      host.address
    }:${app.get("port")}}, url: {yellow http://localhost:${app.get(
      "port"
    )}} , public: {yellow http://${await v4()}:${app.get("port")}}}}`
  );
});
