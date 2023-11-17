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
  allowedAccess: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Schedule',
    },
  ]
});

export default mongoose.model('User', userSchema);