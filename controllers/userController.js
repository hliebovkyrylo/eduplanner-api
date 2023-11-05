import userModel from "../models/userModel.js";
import admin from "firebase-admin";

// Get user info
export const fetchUser = async (req, res) => {
  try {
    const userId = req.params.userId; // User Id

    // Get the user's information from the database
    await userModel.findOne(
      { 
        userId: userId 
      }
    ).then((User) => { 
      if (!User) { // If user is not found we return error 404
        return res.status(404).json({
          message: "User is not found!" // Return this message if user is not found
        });
      }

      res.json(User); // Return user data in json format
    })

  } catch (error) {
    console.log(error) // Return error
    res.status(500).json({
      message: "Failed to upload image!"
    });
  }
};

// Upload user image
export const uplaodImage = async (req, res) => {
  if (!req.file) { // Checking if the file is loaded
    return res.status(400).json({ // If the file was not downloaded then we return a 400 error and return a message
      message: "No file uploaded"
    });
  }

  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT); // Parsing JSON from the FIREBASE_SERVICE_ACCOUNT environment variable
  admin.initializeApp({ // Initialize Firebase Admin using serviceAccount and specifying storageBucket from the environment variable
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET
  });

  try {
    // Upload file to Firebase Storage
    const bucket = admin.storage().bucket(); // Get a link to the Firebase Storage bucket
    const fileRef = bucket.file(req.file.originalname); // Create a link to a file with the name specified in req.file.originalname
    await fileRef.save(req.file.buffer); // Save the file buffer to Firebase Storage

    // Get URL for the uploaded file
    const [url] = await fileRef.getSignedUrl({
      action: 'read',
      expires: '01-01-2094'
    });

    // Return the URL as the response
    res.json({
      imageUrl: url
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ // In case of error, return 500 status
      message: "Failed to upload image!"
    });
  }
}

// Creating user
export const createUser = async (req, res) => {
  try {
    const doc = new userModel({ // User entered data
      userId: req.body.userId,
      name: req.body.name,
      username: req.body.username,
      image: req.body.image,
      onboarded: req.body.onboarded,
    });

    const user = await doc.save(); // Saving user

    res.json(user); // Displaying user information

  } catch (error) {
    console.log(error);
    res.status(500).json({ // If the file was not downloaded then we return a 500 error and return a message
      message: 'Failed to create user!'
    })
  }
};

// Is onboarded
export const isOnboarded = async (req, res) => {
  const id = req.body.id; // Id of the user authorized using Auth0

  try {
    const user = await userModel.findOne({ id }); // search for a user whose ID matches the auth0UserId

    if (user) {
      res.json({ // if the user is found, we will display the true
        userFound: true
      });
    } else {
      res.json({ // if the user is not found, we will display the false
        userFound: false
      });
    }

  } catch (error) {
    console.log(error);
    res.status(500).json({ // If the file was not downloaded then we return a 500 error and return a message
      message: "Failed to find user!"
    })
  }
}