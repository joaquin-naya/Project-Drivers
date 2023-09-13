const getAllDrivers = require("../controllers/getAllDrivers");
const getByName = require("../controllers/getByName");

const allDriversHr = async (req, res) => {
  try {
    const { name } = req.query;
    const aux = name ? await getByName(name) : await getAllDrivers();
    res.status(200).json(aux);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = allDriversHr;
