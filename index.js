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

app.post('/schedule/create', checkAuth, createScheduleValidator, validationErrors, scheduleController.createSchedule);
app.post('/schedule/update/:id', checkAuth, checkOwner, createScheduleValidator, validationErrors, scheduleController.updateSchedule);

app.listen(4000, (err) => {
    if (err) {
        console.log('Server is not working!');
    } 

    console.log('Server has been started!');
})