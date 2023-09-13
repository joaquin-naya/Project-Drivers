const axios = require("axios");
const { Driver, Team } = require("../db");

const getByIdInDb = async (id) => {
  let aux = await Driver.findByPk(id, {
    include: {
      Team,
    },
  });
  return aux;
};

const getByIdInApi = async (id) => {
  const response = await axios.get(`http://localhost:5000/drivers/${id}`);
  let aux = response.data;
  return aux;
};

module.exports = { getByIdInDb, getByIdInApi };
