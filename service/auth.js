import jwt from "jsonwebtoken";

const secret = "NTSH$$03";

export function createTokenForUser(user) {
    const payload = {
        _id : user._id,
        password : user.password,
        email : user.email,
        fullName : user.fullName,
        profileImage : user.profileImage,
        createdAt : user.createdAt
    }

    const token = jwt.sign(payload , secret);

    return token;
}

export function validateToken(token) {
    const payload = jwt.verify(token , secret);

    return payload;
}