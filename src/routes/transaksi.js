const express = require("express");
const router = express.Router();
const transaksiController = require("../controller/transaksi");
const { protect } = require("../middleware/auth");

router.get("/search/", protect, transaksiController.searchKeywordstransaksi);
router.get("/", protect, transaksiController.getAlltransaksi);
router.get("/:id", protect, transaksiController.gettransaksi);
router.post("/", protect, transaksiController.insert);
router.put("/:id", protect, transaksiController.update);
router.delete("/:id", protect, transaksiController.delete);

module.exports = router;
