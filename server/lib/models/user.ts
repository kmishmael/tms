import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

if (!mongoose.models.User) {
  mongoose.model("User", userSchema);
}

const User = mongoose.model("User");

export default User;
