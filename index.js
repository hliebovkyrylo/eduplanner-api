import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import { userController } from "./controllers/index.js";

const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();

mongoose.connect(process.env.MONGODB_URI).then(() => {console.log('DB connected');}).catch((error) => {console.log('DB error!', error);});

// login, register
app.post('/auth/register', userController.register);
app.post('/auth/login', userController.login);

app.listen(4000, (err) => {
    if (err) {
        console.log('Server is not working!');
    } 

    console.log('Server has been started!');
})