import scheduleModel from "../models/sheduleModel.js";

export default async (req, res, next) => {
  try {
    const scheduleId = req.params.id;
    const currentUserId = req.query.userId;

    const schedule = await scheduleModel.findById(scheduleId);

    if ((schedule && schedule.isPublic === true) || (schedule && schedule.author.toString() === currentUserId.toString())) {
      next();
    } else {
      res.status(403).send('Your access is denied!');
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to get schedule!"
    })
  }
}