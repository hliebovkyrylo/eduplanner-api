import scheduleModel from "../models/sheduleModel.js";
import userModel from "../models/userModel.js";

// Creating schedule
export const createSchedule = async (req, res) => {
  try {
    const doc = new scheduleModel({ // When creating a new schedule, the default name will be 'New Schedule'
      groupName: req.body.defaultName,
      author: req.body.author,
      authorUsername: req.body.authorUsername,
    });

    const schedule = await doc.save(); // Save created schedule

    res.json(schedule); // Output of the schedule in json format

  } catch (error) {
    console.log(error); // If error we return error to console and return status 500
    res.status(500).json({
      message: "Failed to create schedule"
    })
  }
};

// Get user schedules
export const fetchUserSchedules = async (req, res) => {
  try {
    const userId = await userModel.findById(req.params.userId); // Get the user id of the schedule you want to find
    const schedules = await scheduleModel.find({ author: userId }).sort({ updatedAt: -1 }); // Get the user's schedule by his id

    res.json(schedules); // Display the found schedules

  } catch (error) {
    console.log(error); // If an error occurs when receiving schedules, we return a 500 error and display a message
    res.status(500).json({
      message: "Failed to get schedules!"
    });
  }
};

// Update public status of schedule
export const updatePublicStatus = async (req, res) => {
  try {
    const scheduleId = req.params.id; // Get the schedule by his id
    const updateSchedule = await scheduleModel.findById(scheduleId);

    if (!updateSchedule) { // If the schedule for this id is not found, we return a 404 error
      res.status(404).json({
        message: "Schedule is not found!"
      });
    }

    updateSchedule.isPublic = !updateSchedule.isPublic; // Update the status to its opposite

    await updateSchedule.save(); // Save the updated schedule

    res.json({
      message: 'isPublic parameter updated'
    });

  } catch (error) {
    console.log(error); // If it was not possible to update the schedule status, we return a 500 error and display a message
    res.status(500).json({
      message: "Failed to change public status!"
    });
  }
}

// Getting one schedule
export const fetchSchedule = async (req, res) => {
  try {
    const scheduleId = req.params.id; // Getting schedule id

    const userId = req.query.userId;
    const currentUser = await userModel.findById(userId).populate('allowedAccess');

    const schedule = await scheduleModel.findOne( // Looking for a schedule based on a given id
      {
        _id: scheduleId
      }
    );

    // If the schedule for this id is not found, we return a 404 error
    if (!schedule) {
      res.status(404).json({
        message: "Schedule is not found!"
      });
    }

    if (currentUser && currentUser._id.toString() !== schedule.author.toString()) {
      // Check for availability of schedule._id in allowedAccess
      const isScheduleAlreadyAdded = currentUser.allowedAccess.some(item => item._id.toString() === schedule._id.toString());

      // If schedule._id has not yet been added, then add
      if (!isScheduleAlreadyAdded) {
        currentUser.allowedAccess.push(schedule._id);

        await currentUser.save();
      }
    }

    res.json(schedule); // Schedule data output

  } catch (error) { // If it was not possible to get schedule, we return a 500 error and display a message
    console.log(error);
    res.status(500).json({
      message: "Failed to get schedule!"
    });
  }
};

// Update schedule data
export const updateSchedule = async (req, res) => {
  try {
    const scheduleId = req.params.id; // Get the schedule ID that needs to be updated

    await scheduleModel.updateOne(
      {
        _id: scheduleId, // Looking for a schedule by ID
      },
      {
        scheduleName: req.body.scheduleName
      },
    );

    res.json({
      message: "Schedule updated!" // If everything went well, displays a message
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