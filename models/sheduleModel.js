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
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }
});

export default mongoose.model('Schedule', scheduleSchema);