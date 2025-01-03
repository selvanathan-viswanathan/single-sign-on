import "dotenv/config";
import express from "express";
import connectDB from "./config/mongodb";
import { errorHandler } from "./middleware/global-error-handler";
import HttpTraceLogger from "./middleware/http-trace-log";
import appRoutes from "./route";
import { openIDWellKnowJson } from "./utilities/constant";

const { PORT } = process.env;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extends: true }));

app.use(HttpTraceLogger);

app.use("/", appRoutes);
app.get("/.well-known/openid-configuration", (req, res) => {
  res.json(openIDWellKnowJson);
});
app.use(errorHandler);

app.listen(PORT, (error) => {
  if (error) {
    console.error("Error starting server ... ", error);
    process.exit(0);
  }
  console.log(`Server started in port  ${PORT}`);
  connectDB();
});
