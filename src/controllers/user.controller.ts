import { type Request, type Response }  from "express";
import { type User }                    from "@prisma/client";
import { ISignUpSchema, ISignInSchema } from "../schemas/user.schema";
import { userService }                  from "../services/user.service";
import { createAccessToken }            from "../utils/token";
import { ProfileDTO }                   from "../dtos/user.dto";
import admin                            from "firebase-admin";
import bcrypt                           from "bcrypt";

class UserController {
  // Create user
  public async signUp(request: Request, response: Response) {
    const data          = request.body as ISignUpSchema; // Extract data from the request body using the ISignUpSchema interface
    const isUniqueEmail = await userService.findUserByEmail(data.email); 

    if (isUniqueEmail !== null) {
      return response.status(400).send({
        code   : "email-already-exist",
        message: "Such email already exists"
      })
    }

    const isUniqueUsername = await userService.findUserByUsername(data.username);

    if (isUniqueUsername !== null) {
      return response.status(400).send({
        code   : "username-already-exist",
        message: "This username already exists"
      });
    }

    const password    = await bcrypt.hash(data.password, 10);
    const user        = await userService.createUser({ ...data, password });
    const accessToken = createAccessToken(user.id);

    response.send({ accessToken }); // Send data about the created user
  };

  public async signIn(request: Request, response: Response) {
    const data = request.body as ISignInSchema;
    const user = await userService.findUserByEmail(data.email);

    if (user !== null) {
      response.status(404).send({
        code: "user-not-found",
        message: "User not found"
      });
    }

    const isCorrectPassword = user && (await bcrypt.compare(data.password, user.password));

    if (!isCorrectPassword) {
      return response.status(401).send({
        code   : "wrong-password",
        message: "Wrong password"
      });
    }

    const accessToken = createAccessToken(user.id);

    response.send({ accessToken });
  };

  // Get user info
  public async fetchUser(request: Request, response: Response) {
    const user = request.user as User;
    const profileDTO = new ProfileDTO(user);

    response.send({ ...profileDTO });
  };

  // Upload user image to firebase
  public async uploadUserImage(request: Request, response: Response) {
    if (!request.file) { // Checking if the file is loaded
      return response.status(400).send({ // If the file was not downloaded then we return a 400 error and return a message
        code   : "no-file-uploaded",
        message: "No file uploaded"
      });
    }

    const firebaseServiceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT as string;
    const serviceAccount               = JSON.parse(firebaseServiceAccountString); // Parsing JSON from the FIREBASE_SERVICE_ACCOUNT environment variable

    admin.initializeApp({ // Initialize Firebase Admin using serviceAccount and specifying storageBucket from the environment variable
      credential   : admin.credential.cert(serviceAccount),
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET
    });

    // Upload file to Firebase Storage
    const bucket  = admin.storage().bucket(); // Get a link to the Firebase Storage bucket
    const fileRef = bucket.file(request.file.originalname); // Create a link to a file with the name specified in req.file.originalname

    await fileRef.save(request.file.buffer); // Save the file buffer to Firebase Storage

    // Get URL for the uploaded file
    const [url] = await fileRef.getSignedUrl({
      action : 'read',
      expires: '01-01-2100'
    });

    // Return the URL as the response
    response.send({
      imageUrl: url
    });
  };
};

export const userController = new UserController();