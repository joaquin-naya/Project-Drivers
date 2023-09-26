const { allDriversHr, getByIdHr, postDriverHr } = require("../handlers/xindex");
const { Router } = require("express");

const driversRouter = Router();
driversRouter.get("/", allDriversHr);
driversRouter.get("/:id", getByIdHr);
driversRouter.post("/", postDriverHr);

module.exports = driversRouter;
