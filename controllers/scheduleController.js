import scheduleModel from "../models/sheduleModel.js";

export const createSchedule = async (req, res) => {
    try {
        const doc = new scheduleModel({
            groupName: req.body.groupName,
            schedule: req.body.schedule
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