import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB povezan: ${connection.connection.host}`);
  } catch (error) {
    console.error(`Greška pri povezivanju sa MongoDB bazom: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;