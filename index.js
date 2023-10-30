import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import { userController, scheduleController } from "./controllers/index.js";
import { createScheduleValidator, userValidator } from "./validations.js";
import { validationErrors, checkOwner } from "./utils/index.js";

import multer from "multer";

const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();

mongoose.connect(process.env.MONGODB_URI).then(() => { console.log('DB connected'); }).catch((error) => { console.log('DB error!', error); });

// Routes for the user
app.get('/auth/me/:id', userController.fetchUser); // Get user info
app.post('/user/create', userValidator, validationErrors, userController.createUser); // Create user information
app.post('/user/isOnboarded', userController.isOnboarded); // Checking whether the user is onboarded

// create, update and delete schedules
app.post('/schedule/create', scheduleController.createSchedule); // Create schedule
app.patch('/schedule/update/:id', checkOwner, createScheduleValidator, validationErrors, scheduleController.updateSchedule);
app.delete('/schedule/delete/:id', checkOwner, scheduleController.deleteSchedule);

// receiving schedules
app.get('/schedules/all', scheduleController.getAllSchedules);
app.get('/schedules/:id', scheduleController.getOneSchedule);

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