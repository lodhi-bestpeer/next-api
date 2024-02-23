import * as mongoose from "mongoose";

export const dbConnection = () => {
  mongoose
    .connect("mongodb://localhost:27017/next-api")
    .then(() => {
      console.log("db connected");
    })
    .catch((error) => {
      console.log(error);
    });
};
