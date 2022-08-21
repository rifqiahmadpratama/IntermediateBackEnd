const express = require("express");
const router = express.Router();
const productController = require("../controller/product");
const { protect } = require("../middleware/auth");
const upload = require("../middleware/upload");
const {
  hitCacheProductDetail,
  clearCacheProductDetail,
} = require("../middleware/redis");

router.get("/search/", protect, productController.searchKeywordsProduct);
router.get("/", protect, productController.getAllproduct);
router.get(
  "/:id",
  protect,
  hitCacheProductDetail,
  productController.getproduct
);
router.post(
  "/",
  protect,
  upload.single("photo"),
  productController.insertProduct
);
router.put(
  "/:id",
  protect,
  clearCacheProductDetail,
  upload.single("photo"),
  productController.updateProduct
);
router.delete(
  "/:id",
  protect,
  clearCacheProductDetail,
  productController.delete
);

module.exports = router;
