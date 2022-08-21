const express = require("express");
const router = express.Router();
const paymentController = require("../controller/payment");
const { protect } = require("../middleware/auth");

router.get("/search/", protect, paymentController.searchKeywordsPayment);
router.get("/", protect, paymentController.getAllpayment);
router.get("/:id", protect, paymentController.getpayment);
router.post("/", protect, paymentController.insert);
router.put("/:id", protect, paymentController.update);
router.delete("/:id", protect, paymentController.delete);

module.exports = router;
