const express = require("express");
const router = express.Router();
const paymentController = require("../controller/payment");
const { protect } = require("../middleware/auth");
const {
  hitCachepaymentDetail,
  clearCachepaymentDetail,
} = require("../middleware/redispayment");

router.get("/search/", protect, paymentController.searchKeywordsPayment);
router.get("/", protect, paymentController.getAllpayment);
router.get(
  "/:id",
  protect,
  hitCachepaymentDetail,
  paymentController.getpayment
);
router.post("/", protect, paymentController.insertPayment);
router.put(
  "/:id",
  protect,
  clearCachepaymentDetail,
  paymentController.updatePayment
);
router.delete(
  "/:id",
  protect,
  clearCachepaymentDetail,
  paymentController.delete
);

module.exports = router;
