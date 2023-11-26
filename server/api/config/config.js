import mongoose from "mongoose";

const moogodbConfig = () => {
  mongoose
    .connect(process.env.MONGO)
    .then(() => {
      console.log("Server connect to MongoDB");
    })
    .catch((e) => {
      console.log(`hubo un error: ${e}`);
    });
};

export default moogodbConfig;
