const User = require("./user.model");

exports.addUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    const token = user.generateAuthToken();
    res.status(200).send({ user: user.username, token });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

exports.logIn = (req, res) => {
  try {
    const token = req.user.generateAuthToken();
    res.status(200).send({ user: req.user.username, token });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(req.user, req.body.updateObj);
    res.status(200).send({ user });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.deleteOne(req.user);
    res.status(200).send({ message: "Success" });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};