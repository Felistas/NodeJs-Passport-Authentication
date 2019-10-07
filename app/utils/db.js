import mongoose from "mongoose";

export const connect = async () => {
  const db = mongoose.connection;

  mongoose.connect("mongodb://localhost/TestDb", {
    useNewUrlParser: true
  });

  db.on("error", console.error.bind(console, "connection error:"));
  await db.once("open", () => {
    console.log("Db connected successfully");
  });
};
