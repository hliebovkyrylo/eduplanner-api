import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
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