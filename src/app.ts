import { integrateFederation } from "@fedify/express";
import { getLogger } from "@logtape/logtape";
import express from "express";
import { AppMiddleware } from "./app.middleware.ts";
import federation from "./federation.ts";

const logger = getLogger("test2");

export const app = express();

app.use((req, res, next) => {
  const nest = new AppMiddleware(app).use(req, res, next);
  nest
    .then(() => {
      next();
    })
    .catch((err) => {
      console.log(JSON.stringify(err));
      next();
    });
});

app.set("trust proxy", true);

app.use(integrateFederation(federation, (req) => undefined));

app.get("/", (req, res) => res.send("Hello, Fedify!"));

export default app;
