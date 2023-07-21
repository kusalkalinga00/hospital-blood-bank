const testController = (req, res) => {
  res.status(200).json({ message: "Welcome to the server", success: true });
};

module.exports = { testController };
