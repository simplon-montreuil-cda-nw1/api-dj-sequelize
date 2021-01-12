const { Club } = require("../models");
const { BadRequestError, NotFoundError } = require("../helpers/errors");

const clubsController = {
  getAllClubs: async () => {
    const clubs = await Club.findAll({
      order: [["name", "ASC"]],
      attributes: ["name"],
      raw: true,
    });
    return clubs;
  },
  getClub: async (name) => {
    const club = await Club.findOne({
      where: {
        name
      },
      attributes: ["id", "name"]
    });
    if (!club) {
      throw new NotFoundError("Ressource introuvable", "Ce club n'existe pas");
    }

    return club;
  },
  addClub: async (data) => {
    const {name} = data;

    const club = await Club.findOne({
      where: {
        name
      }
    });
    if (club) {
      throw new BadRequestError("Ressource existante", "Le club existe déjà");
    }

    const newClub = await Club.create({name});

    return newClub;
  },
};

module.exports = clubsController;
