const { Driver, Team } = require("../db");

const postDriver = async (
  forename,
  surname,
  description,
  image,
  nationality,
  dob,
  arrTeams
) => {
  const existingDriver = await Driver.findOne({ where: { forename, surname } });

  if (existingDriver) {
    const error = new Error("El conductor ya existe");
    error.status = 409;
    throw error;
  }

  const team = await Promise.all(
    arrTeams.map(async (teamName) => {
      //extrae asincrónicamente cada elemento del arreglo arrTeams
      const [result] = await Team.findOrCreate({ where: { name: teamName } }); //se busca o crea un equipo en la base de datos
      return result.id; //extraemos el resultado de id y lo almacenamos.
    })
  );

  const newDriver = await Driver.create({
    forename,
    surname,
    description,
    image,
    nationality,
    dob,
  });

  await newDriver.addTeams(team); //addTeams metodo utilizado para asociar los equipos al nuevo conductor creado con el arreglo team

  return newDriver;
};

module.exports = postDriver;
