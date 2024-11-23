import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      `${process.env.DATABASE_URI}
`,
      { dbName: "AUTH_MERN_APP" }
    );
    console.log(`Database connected successfully.`);
  } catch (error) {
    console.log(`Some error occurs:${error}`);
  }
};

export { connectDB };
