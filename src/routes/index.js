const express = require("express");
require("express-async-errors");

const djsRouter = require("./djs_router");
const musicalGenresRouter = require("./musicalgenres_router");
const clubsRouter = require("./clubs_router");

const mainRouter = express.Router();

mainRouter.use("/djs", djsRouter);
mainRouter.use("/musicalgenres", musicalGenresRouter);
mainRouter.use("/clubs", clubsRouter);

module.exports = mainRouter;
