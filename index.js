import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import { auth } from "express-openid-connect";
import authConfig from "./configs/authConfig.js";

import { userController, scheduleController } from "./controllers/index.js";
import { authValidator, createScheduleValidator } from "./validations.js";
import { checkAuth, validationErrors, checkOwner } from "./utils/index.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(auth(authConfig));

dotenv.config();

mongoose.connect(process.env.MONGODB_URI).then(() => {console.log('DB connected');}).catch((error) => {console.log('DB error!', error);});

// get user info
app.get('/auth/me', checkAuth, userController.getMe);

// create, update and delete schedules
app.post('/schedule/create', checkAuth, createScheduleValidator, validationErrors, scheduleController.createSchedule);
app.patch('/schedule/update/:id', checkAuth, checkOwner, createScheduleValidator, validationErrors, scheduleController.updateSchedule);
app.delete('/schedule/delete/:id', checkAuth, checkOwner, scheduleController.deleteSchedule);

// receiving schedules
app.get('/schedules/all', scheduleController.getAllSchedules);
app.get('/schedule/:id', scheduleController.getOneSchedule);

app.listen(4000, (err) => {
    if (err) {
        console.log('Server is not working!');
    } 

    console.log('Server has been started!');
})