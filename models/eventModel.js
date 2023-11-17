import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  eventName: {
    type: String,
  },
  eventTime: {
    type: String,
  },
  eventColor: {
    type: String,
  },
  rowNum: {
    type: Number,
  },
  colNum: {
    type: Number,
  },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Schedule'
  }
});

export default mongoose.model('Event', eventSchema);