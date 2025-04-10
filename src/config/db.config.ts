import mongoose from 'mongoose';

// connect to mongodb
export const connectToMongoDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.error(
        `Mongodb connection uri is missing. Please include in you .env file`
      );
      process.exit(1);
    }

    await mongoose.connect(process.env.MONGO_URI!);
    console.log(`Connected to MongoDB..`);
  } catch (error) {
    console.error(`Error connecting to MongoDB`);
    process.exit(1);
  }
};
