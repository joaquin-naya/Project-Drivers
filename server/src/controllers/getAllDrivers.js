const axios = require("axios");
const { Driver, Team } = require("../db");
const notFoundImage = "https://i.imgur.com/OGzwjjt.jpeg";

//obtiene informacion de la base de datos
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
      description: driver.description || "",
      image: driver.image?.url || notFoundImage,
      nationality: driver.nationality,
      dob: driver.dob,
      teams: driver.Teams.map((team) => team.name).join(", "),
    };
  });
  //obtiene informacion de la api
  const peticion = (await axios("http://localhost:5000/drivers")).data;
  const allDriversApi = peticion.map((driver) => {
    return {
      id: driver.id,
      forename: driver.name?.forename,
      surname: driver.name?.surname,
      description: driver.description || "",
      image: driver.image?.url || notFoundImage,
      nationality: driver.nationality,
      dob: driver.dob,
      teams: driver.teams,
    };
  });
  //combinacion de resultados
  //allDrivers = [...allDriversApi, ...allDriversDb];
  let allDrivers = [...allDriversApi, ...driversDbFormat];

  if (name) {
    driversByName = allDrivers.filter((driver) =>
      driver.forename.toLowerCase().startsWith(name.toLowerCase())
    );
    if (driversByName.length) {
      return driversByName.slice(0, 15);
    } else {
      throw new Error(`No se encontro por el nombre: ${name}`);
    }
  }
  // la función filtra los conductores por ese nombre y devuelve los primeros 15 conductores que coinciden.
  return allDrivers;
};
module.exports = getAllDrivers;
// const axios = require("axios");
// const { Driver, Team } = require("../db");
// const noImage = "https://i.imgur.com/Ks7SbZt.png";
// let allDrivers = [];

// const getAllDrivers = async () => {
//   const allDriversDb = await Driver.findAll({
//     include: {
//       model: Team,
//       attributes: ["name"],
//       through: {
//         attributes: [],
//       },
//     },
//   });

//   const apiInfo = (await axios("http://localhost:5000/drivers")).data;
//   const allDriversApi = apiInfo.map((driver) => {
//     return {
//       id: driver.id,
//       forename: driver.name.forename,
//       surname: driver.name.surname,
//       description: driver.description || "",
//       image: driver.image.url || noImage,
//       nationality: driver.nationality,
//       dob: driver.dob,
//       teams: driver.teams,
//       driverNameSum: `${driver.name.forename} ${driver.name.surname}`,
//     };
//   });

//   allDrivers = [...allDriversApi, ...allDriversDb];

//   return allDrivers;
// };
