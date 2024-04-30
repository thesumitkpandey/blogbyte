import app from "./app.js";
import mongoose from "mongoose";

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    app.listen(process.env.PORT, () => {
      console.log(`Server is listening on ${process.env.PORT}`);
    });
  } catch (err) {
    console.log("ERROR : ", err);
  }
})();
