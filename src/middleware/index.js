const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../user/user.model");

exports.hashPassword = async (req, res, next) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 8);
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

exports.decryptPassword = async (req, res, next) => {
  try {
    req.user = await User.findOne({
      $or: [{ email: req.body.email }, { username: req.body.username }],
    });
    if (await bcrypt.compare(req.body.password, req.user.password)) {
      next();
    } else {
      throw new Error();
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

exports.tokenCheck = async (req, res, next) => {
  try {
    req.user = await User.findOne({
      _id: jwt.verify(
        req.header("Authorization").replace("Bearer ", ""),
        process.env.SECRET
      )._id,
    });
    if (req.user) {
      next();
    } else {
      throw new Error();
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};