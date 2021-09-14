// external imports
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const cors = require('cors')
const cookieParser = require("cookie-parser");
const fileUpload = require('express-fileupload');
const cloudinary = require('cloudinary').v2;

//cloudinary configuration
cloudinary.config({
  cloud_name: 'dy3odhvvh',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY
});
global.cloudinary = cloudinary

//internal imports
const loginRouter = require("./router/loginRouter");
const usersRouter = require("./router/usersRouter");
const adminRouter = require("./router/adminRouter");

// internal imports
const {
  notFoundHandler,
  errorHandler,
} = require("./middlewares/common/errorHandler");

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000
// database connection
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("database connection successful!"))
  .catch((err) => console.log(err));

  app.use(cors({
    origin:["http://localhost:3000"],
    credentials: true
    }))
// request parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors())
app.use(fileUpload({
  useTempFiles: true   //it must be used
}))

// parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

// routing setup
app.use("/", loginRouter);
app.use("/user", usersRouter);
app.use("/admin", adminRouter);

// 404 not found handler
app.use(notFoundHandler);

// common error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`app listening to port ${PORT}`);
});
