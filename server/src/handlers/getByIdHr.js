const { getById } = require("../controllers/getById");

const getByIdHr = async (req, res) => {
  const { id } = req.params;
  try {
    const driverById = await getById(id);
    res.status(200).json(driverById);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = getByIdHr;
