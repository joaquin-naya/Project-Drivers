const postDriver = require("../controllers/postDriver");

const postDriverHr = async (req, res) => {
  const { forename, surname, description, image, nationality, dob, teams } =
    req.body;
  try {
    const newDriver = await postDriver(
      forename,
      surname,
      description,
      image,
      nationality,
      dob,
      teams
    );
    res.status(200).json(newDriver);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = postDriverHr;
