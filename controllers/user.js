const CustomError = require("../helpers/error/CustomError");
const User = require("../models/User");


const getUser = (async (req, res, next) => {
  try {
      const { id } = req.user;

      const user = await User.findById(id);
    
      res.status(200).json({
          user
      });
  } catch (error) {
    next(error);
  }
});

module.exports = {
  getUser,
  
};
