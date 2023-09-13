const getAllDrivers = require("./getAllDrivers");

const getByName = async (name) => {
  const drivers = await getAllDrivers();

  let aux = name
    ? drivers.filter((driver) =>
        driver.driverNameSum.toLowerCase().includes(name.toLowerCase())
      )
    : drivers;

  return aux;
};

module.exports = getByName;
