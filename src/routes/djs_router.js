const express = require("express");

const { OK, CREATED } = require("../helpers/status_codes");
const {
  getAllDjs,
  getDj,
  addDj,
  deleteDj,
  updateDj,
} = require("../controllers/djs_controller");
const { djValidation } = require("../validators");
const { ValidationError } = require("../helpers/errors");

const router = express.Router();

router.get("/", async (request, response) => {
  const djs = await getAllDjs();
  response.status(OK).json(djs);
});

router.post("/", async (request, response) => {
  const dj = request.body;
  const errors = djValidation(dj);
  if (errors) throw new ValidationError(errors);

  const djToAdd = {
    ...dj,
    url_name: dj.name.toLowerCase().replace(/ /g, "-"),
  };

  const newDj = await addDj(djToAdd);
  response.status(CREATED).json(newDj);
});

router.get("/:name", async (request, response) => {
  const dj = await getDj(request.params.name);
  response.status(OK).json(dj);
});

router.put("/:name", async (request, response) => {
  const dj = request.body;
  const errors = djValidation(dj);
  if (errors) throw new ValidationError(errors);

  const djToUpdate = {
    ...dj,
    url_name: dj.name.toLowerCase().replace(/ /g, "-"),
  };

  const djUpdated = await updateDj(request.params.name, djToUpdate);
  response.status(OK).json(djUpdated);
});

router.delete("/:name", async (request, response) => {
  await deleteDj(request.params.name);
  response.status(OK).json({ message: "Le DJ est supprimé avec succès" });
});

module.exports = router;
