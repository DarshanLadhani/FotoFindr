import { users } from "../models/user.js";

export async function signUpUser(req, res) {
  try {
    const { fullName, email, password, repassword } = req.body;

    if (!fullName || !email || !password || !repassword) {
      throw new Error("All fields are required.");
    }

    const user = await users.findOne({email});
    
    if (user) {
      throw new Error("User already exists")
    }
    
    if (password !== repassword) {
      throw new Error("Password does not match.");
    }

    // Proceed with user creation
    await users.create({ fullName, email, password });
    return res.redirect("/user/login");
  }
  catch (err) {
    return res.render("signupLogin", { error: err.message , activeTab : "signup" }); 
  }
}


export async function signInUser(req, res) {
  const { email, password } = req.body;

  try {
    const token = await users.matchPasswordAndGenerateToken(email, password);

    return res.cookie("token", token).redirect("/");
  } catch (err) {
    return res.render("signupLogin", { error: err.message , activeTab : "login" }); 
  }
}

export async function logOutUser(req, res) {
  res.clearCookie("token").redirect("/");
}

export async function deleteUserAccount(req, res) {
  await users.findOneAndDelete({ _id: req.user._id });

  req.user = null;

  res.clearCookie("token").redirect("/");
}



