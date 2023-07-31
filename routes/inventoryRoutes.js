const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createInventoryController,
  getInventoryController,
  getDonarsController,
  getHospitalsController,
} = require("../controllers/inventoryController");

const router = express.Router();

//routes
//ADD INVENTORY || POST

router.post("/create-inventory", authMiddleware, createInventoryController);

//GET ALL BLOOD RECORDS || GET
router.get("/get-inventory", authMiddleware, getInventoryController);

//GET ALL DONAR RECORDS || GET
router.get("/get-donars", authMiddleware, getDonarsController);

//GET ALL HOSPITAL RECORDS || GET
router.get("/get-hospitals", authMiddleware, getHospitalsController);
module.exports = router;
