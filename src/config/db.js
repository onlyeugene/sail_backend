require("dotenv/config");

const mongoose = require("mongoose");

const connectToDb = async () => {
  try {
    const connectionString = `mongodb+srv://${process.env.MONGO_ADMIN}:${process.env.MONGO_PASSWORD}@cluster0.bjxxx.mongodb.net/`; // Ensure this is set in your .env file

    if (!connectionString) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }

    await mongoose.connect(connectionString, {
    });

    console.log("Connected to MongoDB successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectToDb;
