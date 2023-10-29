import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: {
    type: String
  },
  name: {
    type: String
  },
  username: {
    type: String
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