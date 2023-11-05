import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema({
  scheduleName: {
    type: String,
    default: 'New Schedule'
  },
  events: [
    {
      eventName: {
        type: String,
      },
      eventTime: {
        type: String,
      },
      eventColor: {
        type: String,
      },
    }
  ],
  isPublic: {
    type: Boolean,
    default: false,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true
});

export default mongoose.model('Schedule', scheduleSchema);