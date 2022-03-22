const express = require("express");
const router = express.Router();
const postCommentsController = require("../controllers/postCommentsController");

router.get("/", postCommentsController.index);
router.post("/create", postCommentsController.store);
router.put("/update/:id", postCommentsController.update);
router.delete("/delete/:id", postCommentsController.destroy);

module.exports = router;
