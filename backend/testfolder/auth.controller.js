import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import bcryptjs from "bcryptjs";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/userSchema.js";

export const SignUp = catchAsyncErrors(async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return next(new ErrorHandler("All fields are required.", 400));
  }
  const isUser = await User.findOne({ email });
  if (isUser) {
    return next(new ErrorHandler("Email already exists.", 400));
  }

  //hashed password
  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(password, salt);
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });
  await newUser.save();
  res.status(200).json({
    success: true,
    message: "User created successfully.",
  });
});

//sign in functionality
export const SignIn = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("All fields are required.", 400));
  }
  const validUser = await User.findOne({ email });
  if (!validUser) {
    return next(new ErrorHandler("User not found.", 404));
  }

  const validPassword = bcryptjs.compareSync(password, validUser.password);
  if (!validPassword) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }
});
