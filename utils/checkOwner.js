import scheduleModel from "../models/sheduleModel.js";
import eventModel from "../models/eventModel.js";

export default async (req, res, next) => {
  try {
    const eventId = req.params.id;
    const currentUser = req.query.userId;

    if (!eventId) {
      const parentId = req.query.parentId; 
      const schedule = await scheduleModel.findById(parentId);
      const scheduleId = schedule.author.toString();

      if (currentUser === scheduleId) {
        next();
      } else {
        res.status(403).send('Access denied!');
      }

    } else {
      const event = await eventModel.findById(eventId);

      if (event) {
        const schedule = await scheduleModel.findById(event.parentId);
        const scheduleId = schedule.author.toString();
        const currentUserString = currentUser.toString();

        if (currentUserString === scheduleId) {
          next();
        } else {
          res.status(403).send('Access denied!');
        }
      }
    }

  } catch (error) {
    console.log(error);
    res.status(500).send('Server Error');
  }
};