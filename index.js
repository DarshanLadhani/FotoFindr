// Importing dependencies
import express, { urlencoded } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';


// Third-party Middlewares
import cookieParser from 'cookie-parser';

// Database connection function
import { connectDb } from "./connections/connection.js";

// Defined middlewares
import { checkForAuthenticationCookie } from "./Middlewares/auth.js";

// Routes 
import userRouter from "./routers/user.js";
import userProfileRouter from "./routers/userProfile.js";
import searchRouter from "./routers/search.js";

// Initializing the app
const app = express();
const port = 3000;

// For path resolution
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// Connecting with Database
await connectDb("mongodb://localhost:27017/FotoFindr");

// Built-in Middleware
app.use(express.json())
app.use(express.static(path.join(__dirname , "src")));
app.use(express.static(path.join(__dirname , "public")));
app.use(urlencoded({extended : false}));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));




app.use("/user" , userRouter)
app.use("/userProfile" , userProfileRouter)
app.use("/search" , searchRouter)

// Routes
app.get('/', (req, res) => {
    res.render('home' , {user : req.user});
});

// Listening on port
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
