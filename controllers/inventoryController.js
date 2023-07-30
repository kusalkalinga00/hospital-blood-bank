//CREATE INVENTORY
const userModal = require("../models/userModal");
const inventoryModal = require("../models/inventoryModal");
const mongoose = require("mongoose");

const createInventoryController = async (req, res) => {
  try {
    const { email, inventoryType } = req.body;

    //validation
    const user = await userModal.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }

    // if (inventoryType === "in" && user.role !== "donor") {
    //   throw new Error("User is not a donor");
    // }

    // if (inventoryType === "out" && user.role !== "hospital") {
    //   throw new Error("User is not a hospital");
    // }

    if (req.body.inventoryType === "out") {
      const requestedBloodGroup = req.body.bloodGroup;
      const requestedQuantityOfBlood = req.body.quantity;
      const organization = new mongoose.Types.ObjectId(req.body.userId);

      //calculate total quantity of blood
      const totalInOfRequestedBloodQuantity = await inventoryModal.aggregate([
        {
          $match: {
            organization,
            inventoryType: "in",
            bloodGroup: requestedBloodGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: {
              $sum: "$quantity",
            },
          },
        },
      ]);
      //console.log("Total in ", totalInOfRequestedBloodQuantity);
      const totalIn = totalInOfRequestedBloodQuantity[0]?.total || 0;

      //calculate out quantity of blood

      const totalOutOfRequestedBloodGroup = await inventoryModal.aggregate([
        {
          $match: {
            organization,
            inventoryType: "out",
            bloodGroup: requestedBloodGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: {
              $sum: "$quantity",
            },
          },
        },
      ]);

      const totalOut = totalOutOfRequestedBloodGroup[0]?.total || 0;

      //in and out
      const availabeQuanityOfBloodGroup = totalIn - totalOut;

      //validation
      if (availabeQuanityOfBloodGroup < requestedQuantityOfBlood) {
        return res.status(500).send({
          success: false,
          message: `only ${availabeQuanityOfBloodGroup} unit of ${requestedBloodGroup.toUpperCase()} is available`,
        });
      }
      req.body.hospital = req.body.userId;
    }

    //save record
    const inventory = new inventoryModal(req.body);
    await inventory.save();
    return res.status(200).send({
      success: true,
      message: "New Blood Record added",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in create inventory api",
      error,
    });
  }
};

//GET ALL BLOOD RECORDS || GET
const getInventoryController = async (req, res) => {
  try {
    console.log(req.body.userId);
    const inventory = await inventoryModal
      .find({
        organization: req.body.userId,
      })
      .populate("donor")
      .populate("hospital")
      .sort({ createdAt: -1 });

    return res.status(200).send({
      success: true,
      message: "get all records successfully",
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in GET ALL inventory api",
      error,
    });
  }
};

module.exports = { createInventoryController, getInventoryController };
