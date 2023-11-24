import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectToDB = (MONGO_URI) => {
  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('Connected to MongoDB Successfully');
    })
    .catch((err) => {
      console.log('An error occurred while connecting to MongoDB');
      console.log(err);
    });
};

export default connectToDB;
