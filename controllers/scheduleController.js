import scheduleModel from "../models/sheduleModel.js";

export const createSchedule = async (req, res) => {
    try {
        const doc = new scheduleModel({
            groupName: req.body.groupName,
            schedule: req.body.schedule,
            user: req.userId
        });   
        
        const schedule = await doc.save();

        res.json(schedule)

    } catch (error) {
        console.log(error);
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