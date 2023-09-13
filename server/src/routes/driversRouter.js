const { Router } = require("express");
const { allDriversHr, getByIdHr } = require("../handlers/index");

const driversRouter = Router();
driversRouter.get("/", allDriversHr);
driversRouter.get("/:id", getByIdHr);

module.exports = driversRouter;
