const { sendJwtToClient } = require("../helpers/authorization/tokenHelpers");
const CustomError = require("../helpers/error/CustomError");
const User = require("../models/User");
const {
  validateUserInput,
  comparePassword,
} = require("../helpers/input/inputHelpers");
const Doctor = require("../models/Doctor");

const register = (async (req, res, next) => {
  
  try {
    const user = await User.create(req.body);

    if (req.body.polyclinic) {
      const doctorData = {
        userId: user._id,
        polyclinic: req.body.polyclinic,
      };
      
      const doctor = await Doctor.create(doctorData);
      await doctor.save();
      user.role = "doctor";
    }

    await user.save();

    
    return res.status(200).json({
      message: "Registration Successful!",
    });
  } catch (err) {
    next(err);
  }
});


const login = (async (req, res, next) => {
  const { email, password } = req.body;
  if (!validateUserInput(email, password)) {
    return next(new CustomError("Please check your inputs", 400));
  }
  const user = await User.findOne({ email }).select("+password");

  if (!comparePassword(password, user.password)) {
    return next(new CustomError("Please check your credentials", 400));
  }
  sendJwtToClient(user, res);
});

const logout = (async (req, res, next) => {
  const { NODE_ENV } = process.env;
  return res
    .status(200)
    .cookie({
      httpOnly: true,
      expires: new Date(Date.now()),
      secure: NODE_ENV === "development" ? false : true,
    })
    .json({
      message: "Logged out successfully",
    });
});


module.exports = {
  register,
  login,
  logout,
};
