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
  console.log(
    forename,
    surname,
    description,
    image,
    nationality,
    dob,
    arrTeams
  ); //parametros
  const existingDriver = await Driver.findOne({
    //verificar si ya existe un conductor con fsname
    where: {
      forename,
      surname,
    },
  });
  //error si se encuentra
  if (existingDriver) {
    const error = new Error("El piloto ya existe");
    error.status = 409;
    throw error;
  }

  const team = await Promise.all(
    // realizar operaciones asincrónicas en paralelo para cada elemento del arreglo arrTeams
    arrTeams.map(async (teamName) => {
      const [result] = await Team.findOrCreate({
        //se busca o crea un equipo en la base de datos
        where: { name: teamName },
      });
      return result.id; //extraemos el resultado de id y lo almacenamos.
    })
  );

  const newDriver = await Driver.create({
    //registro del conductor con parametros
    forename,
    surname,
    description,
    image,
    nationality,
    dob,
    driverNameSum: `${forename} ${surname}`,
  });

  await newDriver.addTeams(team);
  //addT metodo utilizado para asociar los equipos al nuevo conductor creado con el arreglo team
  return newDriver;
};

module.exports = postDriver;
