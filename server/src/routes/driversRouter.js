const { Router } = require("express");
const { allDriversHr } = require("../handlers/index");

const driversRouter = Router();
driversRouter.get("/", allDriversHr);

module.exports = driversRouter;
