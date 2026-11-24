const router = require("express").Router();
const { verifyToken, isAdmin } = require("../middleware/auth");
const { getUsers, createUser, updateUser, deleteUser, getMe, updateMe } = require("../controllers/userController");

router.use(verifyToken);
router.get("/me", getMe);
router.put("/me", updateMe);
router.get("/", isAdmin, getUsers);
router.post("/", isAdmin, createUser);
router.put("/:id", isAdmin, updateUser);
router.delete("/:id", isAdmin, deleteUser);

module.exports = router;