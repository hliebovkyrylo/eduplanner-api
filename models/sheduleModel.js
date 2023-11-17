import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema({
  scheduleName: {
    type: String,
    default: 'New Schedule'
  },
  isPublic: {
    type: Boolean,
    default: false,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  authorUsername: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
});

export default mongoose.model('Schedule', scheduleSchema);