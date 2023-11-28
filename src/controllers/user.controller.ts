import { type Request, type Response } from "express";
import admin                           from "firebase-admin";
import { ICreateUserSchema }           from "../schemas/user.schema";
import { userService }                 from "../services/user.service";

class UserController {
  // Create user
  public async createUser(request: Request, response: Response) {
    const data = request.body as ICreateUserSchema; // Extract data from the request body using the ICreateUserSchema interface
    const user = await userService.createUser({ ...data }); // Call the createUser service method, passing the user data

    response.send(user); // Send data about the created user
  };

  // Get user info
  public async fetchUser(request: Request, response: Response) {
    const userId = request.params.userId; // Get the userId from params
    const user   = await userService.findUserById(userId); // Looking for a user using the specified id

    if (!user) {
      return response.status(404).send({ // If the user was not found, we return a 404 error
        code: "user-not-found",
        message: "User not found"
      });
    }

    response.send(user);
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
      expires: '01-01-2094'
    });

    // Return the URL as the response
    response.send({
      imageUrl: url
    });
  };
};

export const userController = new UserController();