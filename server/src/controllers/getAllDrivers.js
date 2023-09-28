const notFoundImage = "https://i.imgur.com/OGzwjjt.jpeg";
const { Driver, Team } = require("../db");
const axios = require("axios");

const getAllDrivers = async (name) => {
  const allDriversDb = await Driver.findAll({
    include: {
      model: Team,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });

  const driversDbFormat = allDriversDb.map((driver) => {
    return {
      id: driver.id,
      forename: driver.forename,
      surname: driver.surname,
      description: driver.description,
      image: driver.image,
      nationality: driver.nationality,
      dob: driver.dob,
      teams: driver.Teams.map((team) => team.name).join(", "),
      createdInDb: true,
    };
  });

  const request = (await axios("http://localhost:5000/drivers")).data;

  const allDriversApi = request.map((driver) => {
    return {
      id: driver.id,
      forename: driver.name?.forename,
      surname: driver.name?.surname,
      description: driver.description || "",
      image: driver.image?.url || notFoundImage,
      nationality: driver.nationality,
      dob: driver.dob,
      teams: driver.teams,
      createdInDb: false,
    };
  });

  let allDrivers = [...allDriversApi, ...driversDbFormat];

  if (name) {
    driversByName = allDrivers.filter((driver) =>
      driver.forename.toLowerCase().startsWith(name.toLowerCase())
    );
    if (driversByName.length) {
      return driversByName.slice(0, 15);
    } else {
      throw new Error(`No se encontró a ningún piloto por el nombre: ${name}`);
    }
  }

  return allDrivers;
};

module.exports = getAllDrivers;
