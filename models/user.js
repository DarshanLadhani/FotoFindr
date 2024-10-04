import mongoose from "mongoose";
import { createHmac, randomBytes } from "crypto";
import { createTokenForUser } from "../service/auth.js";

const userSchema = mongoose.Schema({
    fullName: {type : String , required : true},
    email : {type : String , required : true , unique:true},
    password : {type : String , required : true},
    salt : {type : String},
    profileImage : {type : String , default : "/Images/profileImage.png"},
} , {timestamps : true})


userSchema.pre("save" , function(next) {
    const user = this;

    if (!user.isModified("password")) {
        return;
      } // Checks it user password is modified or not (if not modified it does nothing)

    const salt = randomBytes(16).toString();

    const hashedPassword = createHmac("sha256" , salt).update(user.password).digest("hex");

    this.salt = salt;
    this.password = hashedPassword;

    next();
})

userSchema.static("matchPasswordAndGenerateToken" ,async function (email , password) {
    const user = await this.findOne({email});

    if (!user) {
        throw new Error("User not found Signup to get started");
    }

    if (!password) {
        throw new Error("Enter you password")
    }


    const salt = user.salt;
    const hashedPassword = user.password;

    const userProvidedPassword = createHmac("sha256" , salt).update(password).digest("hex")

    if (hashedPassword !== userProvidedPassword) {throw new Error("Incorrect Password")};

    const token = createTokenForUser(user)
    return token;

})


export const users = mongoose.model("users" , userSchema);