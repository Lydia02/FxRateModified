import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectToDB = (MONGO_URI) => {
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log('Connected to MongoDB Successfully');
    })
    .catch((err) => {
      console.log('An error occurred while connecting to MongoDB');
      console.error(err);
    });
};

export default connectToDB;
