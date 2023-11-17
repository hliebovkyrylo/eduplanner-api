import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import { userController, scheduleController, eventController } from "./controllers/index.js";
import { createEventValidator, createScheduleValidator, userValidator } from "./validations.js";
import { validationErrors, checkOwner, isPublicSchedule } from "./utils/index.js";

import multer from "multer";

const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();

mongoose.connect(process.env.MONGODB_URI).then(() => { console.log('DB connected'); }).catch((error) => { console.log('DB error!', error); });

// Routes for the user
app.get('/user/me/:userId', userController.fetchUser); // Get user info
app.post('/user/create', userValidator, validationErrors, userController.createUser); // Create user information
app.post('/user/isOnboarded/:userId', userController.isOnboarded); // Checking whether the user is onboarded

// create, update and delete schedules
app.post('/schedule/create', scheduleController.createSchedule); // Create schedule
app.patch('/schedule/:id/changePublicStatus', scheduleController.updatePublicStatus);
app.patch('/schedule/update/:id', scheduleController.updateSchedule);
app.delete('/schedule/delete/:id', scheduleController.deleteSchedule);

// receiving schedules
app.get('/schedules/getAllUserSchedules/:userId', scheduleController.fetchUserSchedules);
app.get('/schedule/:id', isPublicSchedule, scheduleController.fetchSchedule);

// actions with events
app.post('/event/create', createEventValidator, validationErrors, eventController.createEvent);
app.get('/event/getAll/:scheduleId', eventController.fetchAllEvents);
app.get('/event/:id', eventController.fetchEvent);
app.patch('/event/:id/update', eventController.updateEvent);

// uplaod image to firebase
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/image/upload', upload.single('image'), userController.uplaodImage);

app.listen(4000, (err) => {
  if (err) {
    console.log('Server is not working!');
  }

  console.log('Server has been started!');
})