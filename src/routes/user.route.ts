import { Router }         from "express";
import { userController } from "../controllers/user.controller";
import { validate }       from "../utils/validate";
import { isAuth }         from "../middleware/isAuth";
import { 
  signInSchema, 
  signUpSchema 
}                         from "../schemas/user.schema";
import multer             from "multer";

export const userRoute = Router();

userRoute.post('/sign-in', validate(signInSchema), userController.signIn);
userRoute.post('/sign-up', validate(signUpSchema), userController.signUp);
userRoute.get('/getMe', isAuth, userController.fetchUser);

// Upload user image to database
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
userRoute.post('/image/upload', upload.single('image'), userController.uploadUserImage);