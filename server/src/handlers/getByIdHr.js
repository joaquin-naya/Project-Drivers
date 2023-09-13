const { getByIdInApi, getByIdInDb } = require("../controllers/getById");

const getByIdHr = async (req, res) => {
  const { id } = req.params;
  try {
    const response = isNaN(id) ? await getByIdInDb(id) : await getByIdInApi(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = getByIdHr;
