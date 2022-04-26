import app from "./app";
import connectToDb from "./utils/connectDb";

app.listen(3000, "127.0.0.1", async () => {
  await connectToDb();
  console.log(`3000 listening`);
});
