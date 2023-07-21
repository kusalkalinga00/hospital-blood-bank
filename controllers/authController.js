const userModal = require("../models/userModal");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//register POST Controller
const registerController = async (req, res) => {
  try {
    const existingUser = await userModal.findOne({ email: req.body.email });

    //validation
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "User already exists",
      });
    }

    //encrypt password and replace with plain password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    //rest data

    const user = new userModal(req.body);
    await user.save();
    res.status(201).send({
      success: true,
      message: "User created successfully",
      user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in register API",
      error,
    });
  }
};

//login POST Controller
const loginController = async (req, res) => {
  try {
    const user = await userModal.findOne({ email: req.body.email });

    //check if user exists
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User does not exists",
      });
    }

    //check role
    if (user.role !== req.body.role) {
      return res.status(500).send({
        success: false,
        message: "Invalid role",
      });
    }

    //Compare password
    const comparePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!comparePassword) {
      return res.status(500).send({
        success: false,
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    return res.status(200).send({
      success: true,
      message: "User logged in successfully",
      token: token,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login API",
      error,
    });
  }
};

//GET current user

const currentUserController = async (req, res) => {
  try {
    const user = await userModal.findOne({ _id: req.body.userId });
    return res.status(200).send({
      success: true,
      message: "User found",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "unable to get current user",
      error,
    });
  }
};

module.exports = { registerController, loginController, currentUserController };
