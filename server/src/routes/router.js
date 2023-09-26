const driversRouter = require("./driversRouter");
const teamsRouter = require("./teamsRouter");
const { Router } = require("express");

const router = Router();
router.use("/drivers", driversRouter);
router.use("/teams", teamsRouter);

module.exports = router;
