const { Team } = require("../db");
const axios = require("axios");

const getAllTeams = async () => {
  const allTeamsDb = await Team.findAll();

  if (!allTeamsDb.length) {
    try {
      const response = await axios.get("http://localhost:5000/drivers");
      const drivers = response.data;

      const driverTeams = drivers
        .map((driver) => driver.teams) // Extrae la propiedad "teams" de cada objeto driver en el arreglo drivers
        .filter((teams) => teams !== undefined) // Filtra los elementos que no sean undefined
        .reduce((acc, teams) => {
          const splitTeams = teams.split(", ").map((team) => team.trim()); // Divide las cadenas de equipos en subcadenas separadas por comas y elimina los espacios en blanco alrededor
          return [...acc, ...splitTeams]; // Concatena las subcadenas de equipos en un solo arreglo
        }, []) // Inicializa el acumulador como un arreglo vacío y usa reduce para combinar los elementos en un solo arreglo
        .filter((team, index, arr) => arr.indexOf(team) === index); // Filtra los elementos duplicados del arreglo

      const teamObjects = driverTeams.map((name) => ({ name }));
      await Team.bulkCreate(teamObjects);
      return driverTeams.sort();
    } catch (error) {
      console.error("Error al obtener los equipos de la API:", error);
    }
  } else {
    const driverTeams = allTeamsDb.map((driver) => driver.name);
    return driverTeams.sort();
  }
};

module.exports = getAllTeams;
