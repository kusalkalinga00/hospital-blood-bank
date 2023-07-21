const express = require("express");
const {
  registerController,
  loginController,
  currentUserController,
} = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

//routes

//register POST route
router.post("/register", registerController);

//login POST route
router.post("/login", loginController);

//get Current User GET
router.get("/current-user", authMiddleware, currentUserController);

module.exports = router;
