const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createInventoryController,
  getInventoryController,
} = require("../controllers/inventoryController");

const router = express.Router();

//routes
//ADD INVENTORY || POST

router.post("/create-inventory", authMiddleware, createInventoryController);

//GET ALL BLOOD RECORDS || GET
router.get("/get-inventory", authMiddleware, getInventoryController);

module.exports = router;
