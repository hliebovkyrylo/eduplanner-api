import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema({
  scheduleName: {
    type: String,
    required: true,
  },
  events: [
    {
      eventName: String,
      eventTime: String,
      eventColor: String,
    }
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

export default mongoose.model('Schedule', scheduleSchema);