const { allTeamsHr } = require("../handlers/xindex");
const { Router } = require("express");

const teamsRouter = Router();
teamsRouter.get("/", allTeamsHr);

module.exports = teamsRouter;
