const express = require("express");

const { OK } = require("../helpers/status_codes");

const {
  getAllMusicalGenres,
} = require("../controllers/musicalgenres_controller");

const router = express.Router();

router.get("/", async (request, response) => {
  const musicalGenres = await getAllMusicalGenres();
  response.status(OK).json(musicalGenres);
});

module.exports = router;
