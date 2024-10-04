import mongoose from "mongoose";

// Connection logic with url
export async function connectDb(url) {
    return mongoose.connect(url)
}
