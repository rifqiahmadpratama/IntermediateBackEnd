const express = require("express");
const router = express.Router();
const transaksi_detailController = require("../controller/transaksi_detail");
const { protect } = require("../middleware/auth");

router.get(
  "/search/",
  transaksi_detailController.searchKeywordstransaksi_detail
);
router.get("/", protect, transaksi_detailController.getAlltransaksi_detail);
router.get("/:id", protect, transaksi_detailController.gettransaksi_detail);
router.post("/", protect, transaksi_detailController.insert);
router.put("/:id", protect, transaksi_detailController.update);
router.delete("/:id", protect, transaksi_detailController.delete);

module.exports = router;
