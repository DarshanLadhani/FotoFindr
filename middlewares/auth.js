import { validateToken } from "../service/auth.js";

export function checkForAuthenticationCookie(cookieToken) {
    
    return (req , res , next) => {
        const cookieTokenValue = req.cookies[cookieToken];

        if (!cookieTokenValue) {return next()};

        try {
            const user = validateToken(cookieTokenValue);
            req.user = user;
        } catch (error) {
            console.log(error);
        }

        return next();
    }
}