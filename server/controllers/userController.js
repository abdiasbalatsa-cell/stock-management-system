const bcrypt = require("bcryptjs");
const User = require("../models/User");
const handleError = require("../utils/handleError");

const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    return res.status(200).json(users);
  } catch (error) {
    return handleError(res, error);
  }
};

const createUser = async (req, res) => {
  try {
    const { name, phone, email, password, role } = req.body;
    if (!name || !email || !password || password.length < 6) {
      return res.status(400).json({ message: "Lack credentials" });
    }
    const secure = await bcrypt.hash(password, 10);
    const user = await User.create({ name, phone, email, password: secure, role });
    const { password: _, ...safeUser } = user.toObject();
    return res.status(201).json(safeUser);
  } catch (error) {
    return handleError(res, error);
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, phone, role } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, phone, role },
      { new: true, runValidators: true }
    ).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.status(200).json(user);
  } catch (error) {
    return handleError(res, error);
  }
};

const deleteUser = async (req, res) => {
  try {
    if (req.params.id === req.user.id) {
      return res.status(400).json({ message: "You cannot delete yourself" });
    }
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.status(200).json({ message: "User deleted" });
  } catch (error) {
    return handleError(res, error);
  }
};

const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.status(200).json(user);
  } catch (error) {
    return handleError(res, error);
  }
};

const updateMe = async (req, res) => {
  try {
    const { name, phone, email } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, phone, email },
      { new: true, runValidators: true }
    ).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.status(200).json(user);
  } catch (error) {
    return handleError(res, error);
  }
};

module.exports = { getUsers, createUser, updateUser, deleteUser, getMe, updateMe };