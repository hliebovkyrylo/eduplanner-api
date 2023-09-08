import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema({
    groupName: {
        type: String,
        required: true,
    },
    schedule: {
        monday: {
            type: [{
                pairNumber: Number,
                pairTitle: String,
            }],
            default: undefined
        },
        tuesday: {
            type: [{
                pairNumber: Number,
                pairTitle: String,
            }],
            default: undefined
        },
        wednesday: {
            type: [{
                pairNumber: Number,
                pairTitle: String,
            }],
            default: undefined
        },
        thursday: {
            type: [{
                pairNumber: Number,
                pairTitle: String,
            }],
            default: undefined
        },
        friday: {
            type: [{
                pairNumber: Number,
                pairTitle: String,
            }],
            default: undefined
        },
        mondaySecond: {
            type: [{
                pairNumber: Number,
                pairTitle: String,
            }],
            default: undefined
        },
        tuesdaySecond: {
            type: [{
                pairNumber: Number,
                pairTitle: String,
            }],
            default: undefined
        },
        wednesdaySecond: {
            type: [{
                pairNumber: Number,
                pairTitle: String,
            }],
            default: undefined
        },
        thursdaySecond: {
            type: [{
                pairNumber: Number,
                pairTitle: String,
            }],
            default: undefined
        },
        fridaySecond: {
            type: [{
                pairNumber: Number,
                pairTitle: String,
            }],
            default: undefined
        },
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

export default mongoose.model('Shedule', scheduleSchema);