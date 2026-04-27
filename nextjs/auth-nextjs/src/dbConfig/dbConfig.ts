import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;

    connection.on('connect', () => {
        console.log("MongoDB connected successfully!")
    })

    connection.on('error', (err) => {
        console.log("MongoDB connection error!");
        console.log(err);
        process.exit(1);
    })
  } catch (err) {
    console.log("Something went wrong!");
    console.log(err);
  }
}
