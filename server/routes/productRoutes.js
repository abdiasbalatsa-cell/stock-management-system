const router = require("express").Router();
const { verifyToken, isAdmin } = require("../middleware/auth");
const { getProducts, createProduct, updateProduct, deleteProduct } = require("../controllers/productController");

router.use(verifyToken);
router.get("/", getProducts);
router.post("/", isAdmin, createProduct);
router.put("/:id", isAdmin, updateProduct);
router.delete("/:id", isAdmin, deleteProduct);

module.exports = router;