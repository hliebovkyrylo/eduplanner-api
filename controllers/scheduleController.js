import scheduleModel from "../models/sheduleModel.js";

// creating schedule
export const createSchedule = async (req, res) => {
  try {
    const dafaultName = 'New Schedule'
    const doc = new scheduleModel({ // when creating a new schedule, the default name will be 'New Schedule'
      groupName: dafaultName,
    });

    const schedule = await doc.save(); // save created schedule

    res.json(schedule); // output of the schedule in json format

  } catch (error) {
    console.log(error); // if error we return error to console and return status 500
    res.status(500).json({
      message: "Failed to create schedule"
    })
  }
};

export const updateSchedule = async (req, res) => {
  try {
    const scheduleId = req.params.id;

    await scheduleModel.updateOne(
      {
        _id: scheduleId,
      },
      {
        groupName: req.body.groupName,
        schedule: req.body.schedule
      },
    );

    res.json({
      message: "Schedule updated!"
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to update schedule!"
    });
  }
};

export const deleteSchedule = async (req, res) => {
  try {
    const scheduleId = req.params.id;

    await scheduleModel.findByIdAndDelete(
      {
        _id: scheduleId
      },
    ).then((schedule) => {
      if (!schedule) {
        return res.status(404).json({
          message: "Schedule is not found!"
        });
      }
    })

    res.json({
      message: "Schedule has been deleted!"
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to delete schedule!"
    });
  }
};

export const getAllSchedules = async (req, res) => {
  try {
    const schedules = await scheduleModel.find().exec();

    res.json(schedules)

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to get schedules!"
    })
  }
};

export const getOneSchedule = async (req, res) => {
  try {
    const schedules = req.params.id;

    await scheduleModel.findOne(
      {
        _id: schedules
      }
    ).then((schedule) => {
      if (!schedule) {
        res.status(404).json({
          message: "Schedule is not found!"
        });
      }

      res.json(schedule);
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to get schedule!"
    });
  }
};