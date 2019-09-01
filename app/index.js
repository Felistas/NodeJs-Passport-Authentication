import express from "express";
import { json } from "body-parser";

import { connect } from "./utils/db";

const app = express();
const port = 3000;

app.use(json());

app.listen(port, () => {
  connect();
  console.log(`Server listening on ${port}`);
});
