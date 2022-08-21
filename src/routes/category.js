const express = require("express");
const router = express.Router();
const categoryController = require("../controller/category");
const { protect } = require("../middleware/auth");

router.get("/search/", protect, categoryController.searchKeywordsCategory);
router.get("/", protect, categoryController.getAllCategory);
router.get("/:id", protect, categoryController.getCategory);
router.post("/", protect, categoryController.insert);
router.put("/:id", protect, categoryController.update);
router.delete("/:id", protect, categoryController.delete);

module.exports = router;
