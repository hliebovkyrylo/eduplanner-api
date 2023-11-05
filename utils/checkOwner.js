import scheduleModel from "../models/sheduleModel.js";

export default async (req, res, next) => {
  try {
    const scheduleId = req.params.id;
    const currentUser = req.userId;
    const schelude = await scheduleModel.findById(scheduleId);

    if (schelude && schelude.user === currentUser) {
      next()
    } else {
      res.status(401).send('Your access is denied');
    }

  } catch (error) {
    console.log(error);
    res.status(500).send('Server Error');
  }
};