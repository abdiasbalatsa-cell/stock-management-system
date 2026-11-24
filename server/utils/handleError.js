const handleError = (res, error) => {
  if (error.code === 11000) {
    return res.status(400).json({ message: "Email already used" });
  }
  if (error.name === "ValidationError" || error.name === "CastError") {
    return res.status(400).json({ message: error.message });
  }
  console.log(error);
  return res.status(500).json({ message: "Server error" });
};

module.exports = handleError;