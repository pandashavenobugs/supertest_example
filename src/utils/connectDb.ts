import mongoose from "mongoose";

export default async function connectToDb() {
  try {
    const dbUri = "mongodb://localhost:27018";
    const dbName = "test";
    await mongoose.connect(dbUri, {
      dbName,
      autoCreate: true,
    });
  } catch (error) {
    console.log("DB connect error");
    console.log(error);
  }
}
