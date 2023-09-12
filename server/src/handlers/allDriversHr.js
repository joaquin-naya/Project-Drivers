const getAllDrivers = require("../controllers/getAllDrivers");

const allDriversHr = async (req, res) => {
  try {
    const allDrivers = await getAllDrivers();
    res.status(200).json(allDrivers);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = allDriversHr;
