import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  name: {
    type: String
  },
  username: {
    type: String,
    unique: true,
  },
  image: {
    type: String
  },
  onboarded: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model('User', userSchema);