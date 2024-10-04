import { Router } from "express";
import { signUpUser  , signInUser ,logOutUser, deleteUserAccount} from "../controllers/user.js";
const router = Router();

// import multer from "multer";

// // We are going to store files on our local storage
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     // callback function to create folder
//     return cb(null, "./public/profileUploads");
//   },
//   filename: function (req, file, cb) {
//     return cb(null, `${Date.now()} - ${file.originalname}`); // callback function to create file (Creating our own name)
//   },
// });

// const upload = multer({ storage: storage }); // Creating instance (upload is a middleware)

// router for signup
router.get("/signup" , (req , res)=> {
  return res.render("signupLogin" , {activeTab : "signup"})
})

// router for login
router.get("/login" , (req , res)=> {
  return res.render("signupLogin" , {activeTab : "login"})
})

// router for logout
router.get("/logout" , logOutUser)

// router for deleting the user account
router.get("/delete" , deleteUserAccount)


// routers for signup & login (post method)
router.post("/signup" , signUpUser)
router.post("/login" , signInUser)

export default router;