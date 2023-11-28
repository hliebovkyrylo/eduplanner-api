import { Router }           from "express";
import { userController }   from "../controllers/user.controller";
import { validate }         from "../utils/validate";
import multer               from "multer";
import { createUserSchema } from "../schemas/user.schema";

export const userRoute = Router();

userRoute.post('/create', validate(createUserSchema), userController.createUser);
userRoute.get('/:userId', userController.fetchUser);

// Upload user image to database
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
userRoute.post('/image/upload', upload.single('image'), userController.uploadUserImage);