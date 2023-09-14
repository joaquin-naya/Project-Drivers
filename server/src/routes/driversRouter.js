const { Router } = require("express");
const { allDriversHr, getByIdHr, postDriverHr } = require("../handlers/index");

const driversRouter = Router();
driversRouter.get("/", allDriversHr);
driversRouter.get("/:id", getByIdHr);
driversRouter.post("/", postDriverHr);

module.exports = driversRouter;
