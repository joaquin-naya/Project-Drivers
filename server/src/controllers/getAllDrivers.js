const axios = require("axios");
const { Driver, Team } = require("../db");
const noImage = "https://i.imgur.com/Ks7SbZt.png";
let allDrivers = [];

const getAllDrivers = async () => {
  const allDriversDb = await Driver.findAll({
    include: {
      model: Team,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });

  const apiInfo = (await axios("http://localhost:5000/drivers")).data;
  const allDriversApi = apiInfo.map((driver) => {
    return {
      id: driver.id,
      forename: driver.name.forename,
      surname: driver.name.surname,
      description: driver.description || "",
      image: driver.image.url || noImage,
      nationality: driver.nationality,
      dob: driver.dob,
      teams: driver.teams,
      driverNameSum: `${driver.name.forename} ${driver.name.surname}`,
    };
  });

  allDrivers = [...allDriversApi, ...allDriversDb];

  return allDrivers;
};

module.exports = getAllDrivers;
