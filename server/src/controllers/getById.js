const notFoundImage = "https://i.imgur.com/OGzwjjt.jpeg";
const { Driver, Team } = require("../db");
const axios = require("axios");

const getById = async (id) => {
  if (isNaN(id)) {
    const driver = await Driver.findByPk(id, { include: Team }); //incluye información del equipo asociado al conductor
    const driverFormat = {
      id: driver.id,
      forename: driver.forename,
      surname: driver.surname,
      description: driver.description,
      image: driver.image?.url,
      nationality: driver.nationality,
      dob: driver.dob,
      teams: driver.Teams.map((team) => team.name).join(", "),
    };
    if (!driver) {
      throw new Error(
        `Conductor con id: ${id} no encontrado en la base de datos`
      );
    }
    return driverFormat;
  } else {
    try {
      const { data } = await axios.get(`http://localhost:5000/drivers/${id}`);
      const driverApi = {
        id: data.id,
        forename: data.name?.forename,
        surname: data.name?.surname,
        description: data.description || "",
        image: data.image?.url,
        nationality: data.nationality,
        dob: data.dob,
        teams: data.teams,
        // createdInDb: false,
      };
      return driverApi;
    } catch (error) {
      throw new Error(`Conductor con id: ${id} no encontrado en la API`);
    }
  }
};

module.exports = { getById };
