import { users } from "../models/user.js";
import { createTokenForUser } from "../service/auth.js";

export async function showUserProfile(req, res) {
  res.render("profile", { user: req.user });
}

export async function updateUserProfile(req, res, updatedData) {

  const updatedUser = await users.findOneAndUpdate(
    { _id: req.user._id },
    {
      $set: {
        profileImage: updatedData.profileImage,
      },
    },
    { new: true }
  );
  
  req.user = updatedUser;

  const token = createTokenForUser(req.user);

  return res.cookie("token", token).redirect("/userProfile");
}

