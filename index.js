import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import { userController, scheduleController } from "./controllers/index.js";
import { authValidator, createScheduleValidator } from "./validations.js";
import { checkAuth, validationErrors, checkOwner } from "./utils/index.js";

const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();

mongoose.connect(process.env.MONGODB_URI).then(() => {console.log('DB connected');}).catch((error) => {console.log('DB error!', error);});

// login, register
app.post('/auth/register', authValidator, validationErrors, userController.register);
app.post('/auth/login', authValidator, validationErrors, userController.login);
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