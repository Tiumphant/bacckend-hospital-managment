const Role = require("../model/rolemodel.js");
const express = require("express");
const route = express.Router();
route.use(express.json());

const handleError = (res, error) => {
  console.error(error);
  res.status(500).json({ message: "Error", error: error.message });
};


route.get("/role", async (req, res) => {
  try {
    let roles = await Role.find();
    res.status(200).json(roles);
  } catch (error) {
    handleError(res, error);
  }
});


route.post("/role", async (req, res) => {
  try {
    const roleData = req.body;
    const result = await Role.create(roleData);
    res.status(201).json({ message: "Role created successfully", data: result });
  } catch (error) {
    handleError(res, error);
  }
});

route.get("/role/:id", async (req, res) => {
  try {
    let id = req.params.id;
    
    if (!id) {
      return res.status(400).json({ message: "Role ID is required" });
    }

    let result = await Role.findById(id);
    if (!result) {
      return res.status(404).json({ message: "Role not found" });
    }

    res.status(200).json(result);
  } catch (error) {
    handleError(res, error);
  }
});

//  SEARCH roles by keyword (name/description)
route.get("/role/search/:key", async (req, res) => {
  try {
    let key = req.params.key;
    let insensitive = new RegExp(key, "i");
    let result = await Role.find({
      $or: [{ name: { $regex: insensitive } }, { description: { $regex: insensitive } }],
    });
    res.status(200).json(result);
  } catch (error) {
    handleError(res, error);
  }
});

//  UPDATE (PUT) a role by ID
route.put("/role/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const result = await Role.findByIdAndUpdate(id, { $set: updateData }, { new: true, runValidators: true });

    if (!result) {
      return res.status(404).json({ message: "Role not found or no changes made" });
    }

    res.status(200).json({ message: "Role updated successfully", data: result });

  } catch (error) {
    console.error("Error updating role:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});
route.delete("/role/:id", async (req, res) => {
  try {
    const deletedRole = await Role.findByIdAndDelete(req.params.id);
    if (!deletedRole) {
      return res.status(404).json({ message: "Role not found" });
    }
    res.json({ message: "Role deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting role" });
  }
});




module.exports = route;