import express from "express";
import { json } from "body-parser";

const app = express();
const port = 3000;

app.use(json());

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
