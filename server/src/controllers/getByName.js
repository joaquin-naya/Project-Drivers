const getAllDrivers = require("./getAllDrivers");

const getByName = async (name) => {
  const drivers = await getAllDrivers();
  const allMatches = drivers.filter((driver) =>
    driver.driverNameSum.toLowerCase().includes(name.toLowerCase())
  );
  const aux = allMatches.slice(0, 15);
  return aux;
};

module.exports = getByName;
