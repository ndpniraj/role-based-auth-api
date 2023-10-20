import mongoose from "mongoose";

const uri = "mongodb://127.0.0.1:27017/my_cool_db";

mongoose
  .connect(uri)
  .then(() => {
    console.log("DB is connected!");
  })
  .catch((err) => {
    console.log("Could not connect: ", err.message);
  });
