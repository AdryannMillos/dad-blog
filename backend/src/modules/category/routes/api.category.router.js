const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

router.get("/", categoryController.index);
router.post("/create", categoryController.store);
router.put("/update/:id", categoryController.update);
router.delete("/delete/:id", categoryController.destroy);

module.exports = router;
