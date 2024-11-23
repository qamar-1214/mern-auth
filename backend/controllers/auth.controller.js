import cookie from "cookie-parser";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js"; // Assuming this is the path
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

//signup functionality
export const SignUp = catchAsyncErrors(async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return next(new ErrorHandler("All fields are required.", 400));
  }
  const isUser = await User.findOne({ email });
  if (isUser) {
    return next(new ErrorHandler("Email already exists.", 400));
  }

  //password hashed
  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(password, salt);
  const newUser = new User({ username, email, password: hashedPassword });

  await newUser.save();
  res.status(200).json({
    success: true,
    message: `${username} created successfully.`,
  });
});

//Signin functionality
export const SignIn = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("All fields are required.", 404));
  }
  const validUser = await User.findOne({ email });
  if (!validUser) {
    return next(new ErrorHandler("User not found", 404));
  }

  const validPassword = bcryptjs.compareSync(password, validUser.password);
  if (!validPassword)
    return next(new ErrorHandler("Invalid email or password.", 401));
  const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
  const { password: hashedPassword, ...rest } = validUser._doc;
  const expiryDate = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now

  console.log(token);
  res
    .cookie("token", token, { httpOnly: true, expires: expiryDate })
    .status(200)
    .json({
      success: true,
      error: false,
      data: rest,
      token: token,
      message: "User Logged In Successfully.",
    });
});

export const google = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    const { password: hashedPassword, ...rest } = user._doc;
    const expiryDate = new Date(Date.now() + 3600000);
    res.cookie("token", token, { httpOnly: true, expires: expiryDate });
  } else {
    const generatedPassword =
      Math.random().toString(36).slice(-8) +
      Math.random().toString(36).slice(-8);
    const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
    const newUser = new User({
      username:
        req.body.name.split(" ").join("").toLowerCase() +
        Math.floor(Math.random() * 10000).toString(),
      email: req.body.email,
      password: hashedPassword,
      profilePicture: req.body.photo,
    });
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
    const { password: hashedPassword2, ...rest } = newUser._doc;
    const expiryDate = new Date(Date.now() + 3600000);
    res
      .cookie("token", token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json(rest);
  }
});
