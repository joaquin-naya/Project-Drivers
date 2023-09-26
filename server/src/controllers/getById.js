const axios = require("axios");
const { Driver, Team } = require("../db");

const getById = async (id) => {
  // recupera información de un conductor específico según su ID.
  if (isNaN(id)) {
    // función verifica si el ID es un número o no para determinar si debe buscar en la base de datos
    const driverById = await Driver.findByPk(id, { include: Team }); //incluye información del equipo asociado al conductor
    const format = {
      id: driverById.id,
      forename: driverById.forename,
      surname: driverById.surname,
      description: driverById.description,
      image: driverById.image.url,
      nationality: driverById.nationality,
      dob: driverById.dob,
      teams: driverById.Teams.map((team) => team.name).join(", "),
    };
    if (!driverById) {
      //si id no es un numero busca al conductor en la db
      throw new Error(
        `Conductor con id: ${id} no encontrado en la base de datos`
      );
    }
  } else {
    try {
      const response = await axios.get(`http://localhost:5000/drivers/${id}`);
      format = response.data; //intenta recuperar informacion en una API externa
    } catch (error) {
      throw new Error(`Conductor con id: ${id} no encontrado en la API`);
    }
  }

  return format;
  //   let aux = await Driver.findByPk(id, {
  //     include: {
  //       model: Team,
  //       through: {
  //         attributes: [],
  //       },
  //     },
  //   });
  //   return aux;
  // };

  // const getByIdInApi = async (id) => {
  //   const response = await axios.get(`http://localhost:5000/drivers/${id}`);
  //   let aux = response.data;
  //   return aux;
};

module.exports = { getById };
