import { Router } from "express";
import {showUserProfile , updateUserProfile} from "../controllers/userProfile.js"

const router = Router();

import multer from "multer";

// We are going to store files on our local storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // callback function to create folder
    return cb(null, "./public/profileUploads");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()} - ${file.originalname}`); // callback function to create file (Creating our own name)
  },
});

const upload = multer({ storage: storage }); // Creating instance (upload is a middleware)

router.get("/" , showUserProfile)

router.post("/update" , upload.single("profileImage") , (req , res)=>{

    const profileImage = req.file.filename;
    
    const updatedData = {}

    updatedData.profileImage = `/profileUploads/${profileImage}`;
    
    updateUserProfile(req , res , updatedData)
})

export default router;