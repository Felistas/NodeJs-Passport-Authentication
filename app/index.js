import express from "express";
import { json } from "body-parser";

import { connect } from "./utils/db";
import userRouter from "./user/user.routes";

const app = express();
const port = 3000;

app.use(json());
app.use("/users", userRouter);

app.listen(port, async () => {
  await connect();
  console.log(`Server listening on ${port}`);
});
