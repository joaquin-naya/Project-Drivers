const { Driver, Team } = require("../db");

const postDriver = async (
  forename,
  surname,
  description,
  image,
  nationality,
  dob,
  teams
) => {
  const existingDriver = await Driver.findOne({
    where: {
      forename,
      surname,
    },
  });

  if (existingDriver) {
    const error = new Error("The pilot already exists");
    error.status = 409; // Conflict
    throw error;
  }

  if (!forename & !surname & !description & !image & !nationality & !dob) {
    return res.status(400).send("Faltan datos");
  }

  let newDriver = await Driver.create({
    forename,
    surname,
    description,
    image,
    nationality,
    dob,
    driverNameSum: `${forename} ${surname}`,
  });

  const teamsDb = await Team.findAll({ where: { name: teams } });
  await newDriver.addTeam(teamsDb);

  return newDriver;
};

module.exports = postDriver;
