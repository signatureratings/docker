const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

exports.signUp = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const hashPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      username,
      password: hashPassword,
    });
    req.session.user = user;

    res.status(201).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "fail" });
  }
};

exports.login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(404).json({
        status: "fail",
        message: "Invalid credentials",
      });
    }
    req.session.user = user;
    
    res.status(200).json({
      status: "success",
      message: "User loged IN",
    });
  } catch (error) {
    res.status(400).json({ status: "fail" });
  }
};
