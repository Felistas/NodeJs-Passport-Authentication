import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fisrtName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
});

const userModel = mongoose.model("User", userSchema);

export default userModel;