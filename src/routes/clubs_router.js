const express = require("express");

const { OK } = require("../helpers/status_codes");
const {
  getAllClubs,
  getClub,
  addClub
} = require("../controllers/clubs_controller");

const router = express.Router();

router.get("/", async (request, response) => {
  const djs = await getAllClubs();
  response.status(OK).json(djs);
});

router.get("/:name", async (request, response) => {
  const dj = await getClub(request.params.name);
  response.status(OK).json(dj);
});

router.post("/", async (request, response) => {
  const clubToAdd = request.body;

  const newClub = await addClub(clubToAdd);
  response.status(CREATED).json(newClub);
});


module.exports = router;
