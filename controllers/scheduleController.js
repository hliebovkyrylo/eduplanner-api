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