const { Router } = require("express");
const { allTeamsHr } = require("../handlers/index");

const teamsRouter = Router();
teamsRouter.get("/", allTeamsHr);

module.exports = teamsRouter;
