import eventModel from "../models/eventModel.js";

// Create event
export const createEvent = async (req, res) => {
  try {
    const doc = new eventModel({ // Enter event data
      eventName: req.body.eventName,
      eventTime: req.body.eventTime,
      eventColor: req.body.eventColor,
      rowNum: req.body.rowNum,
      colNum: req.body.colNum,
      parentId: req.body.parentId,
    });

    const event = await doc.save(); // Saving event data

    res.json(event); // Display the saved event in json format

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to create event!"
    });
  }
}

// Getting all events belonging to one schedule 
export const fetchAllEvents = async (req, res) => {
  try {
    const scheduleId = req.params.scheduleId;

    const events = await eventModel.find({ parentId: scheduleId }).populate('parentId')

    res.json(events);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to get events!"
    });
  }
}

// Getting one event
export const fetchEvent = async (req, res) => {
  try {
    const eventId = req.params.id; 

    const event = await eventModel.findById(eventId); // Looking event by his id

    if (!event) {
      res.status(404).json({
        message: "Event is not found!"
      });
    }

    res.json(event); // Display the event
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to fetch event!"
    });
  }
}

// Update event
export const updateEvent = async (req, res) => {
  try {
    const eventId = req.params.id; // Looking event by his id

    const event = await eventModel.findOneAndUpdate(
      {
        _id: eventId
      }, 
      {
        eventName: req.body.eventName,
        eventTime: req.body.eventTime,
        eventColor: req.body.eventColor,
      }
    );

    res.json(event); // Display the updated event

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to update event!"
    });
  }
};