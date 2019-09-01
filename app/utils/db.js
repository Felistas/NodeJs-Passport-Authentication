import mongoose from "mongoose";

export const connect = () => {
  const db = mongoose.connection;

  mongoose.connect("mongodb://localhost/User", {
    useNewUrlParser: true
  });

  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", () => {
    console.log("Db connected successfully");
  });
};
