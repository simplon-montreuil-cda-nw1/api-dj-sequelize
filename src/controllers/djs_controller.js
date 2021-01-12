const { pick } = require("lodash");

const { Dj, Musicalgenre, DjMusicalgenre, Club } = require("../models");
const { NotFoundError } = require("../helpers/errors");

async function buildMusicalGenresArray(musicalGenres, dj_id) {
  const musicalGenresFromDatabase = await Musicalgenre.findAll();

  return musicalGenres.map((musicalGenre) => {
    const musicalGenreFound = musicalGenresFromDatabase.find((musicalGenreFromDatabase) =>
    musicalGenre === musicalGenreFromDatabase.name);
    if (!musicalGenre) {
      throw new NotFoundError("Ressource introuvable", "Ce genre de musique n'existe pas");
    }
    return {
      dj_id,
      musicalgenre_id: musicalGenreFound.id
    }
  });
}

const djsController = {
  getAllDjs: async () => {
    const djs = await Dj.findAll({
      order: [["name", "ASC"]],
      attributes: {exclude: ["createdAt", "updatedAt, club_id"]},
      include: [
        {
          model: Club,
          attributes: ["name"],
        },
        {
          model: Musicalgenre,
          as: "musical_genres",
          through: { attributes: [] },
        },
      ],
      raw: true,
    });
    return djs;
  },

  getDj: async (name) => {
    const dj = await Dj.findOne({
      where: {
        name
      },
      attributes: {exclude: ["createdAt", "updatedAt, club_id"]},
      include: [
        {
          model: Club,
          attributes: ["name"],
          as: "clubs",
        },
        {
          model: Musicalgenre,
          as: "musical_genres",
          through: { attributes: [] },
        },
      ],
    });
    if (!dj) {
      throw new NotFoundError("Ressource introuvable", "Ce DJ n'existe pas");
    }

    return dj;
  },

  addDj: async (data) => {
    const {name, club_id} = data;
    console.log(data);
    
    const dj = await Dj.findOne({
      where: {
        name
      }
    });
    if (dj) {
      throw new BadRequestError("Ressource existante", "Ce DJ existe déjà");
    }

    const club = await Club.findOne({
      where: {
        id: club_id
      }
    });
    if (!club) {
      throw new NotFoundError("Ressource introuvable", "Ce club n'existe pas");
    }
    
    const newDj = await Dj.create(data);

    const musicalGenre = await Musicalgenre.findOne({
      where: {
        name: data.musical_genres[0]
      }
    });
    if (!musicalGenre) {
      throw new NotFoundError("Ressource introuvable", "Ce genre de musique n'existe pas");
    }

    await DjMusicalgenre.create({
      dj_id: newDj.id,
      musicalgenre_id: musicalGenre.id,
    });

    return newDj;
  },

  updateDj: async (name, data) => {
    const djFound = await Dj.findOne({
      include: [
        {
          model: Club,
          attributes: ["name"],
          as: "clubs",
        },
        {
          model: Musicalgenre,
          as: "musical_genres",
          through: { attributes: [] },
        },
      ],
      where: { name },
    });
    if (!djFound) {
      throw new NotFoundError("Ressource introuvable", "Ce DJ n'existe pas");
    }

    const djUpdated = await djFound.update(data);

    const musicalGenresToUpdate = await buildMusicalGenresArray(data.musical_genres, djUpdated.id);
    await DjMusicalgenre.destroy({
      where: { dj_id: djUpdated.id }
    });
    await DjMusicalgenre.bulkCreate(musicalGenresToUpdate);

    const dj = await Dj.findOne({
      where: {
        name
      },
      attributes: {exclude: ["createdAt", "updatedAt, club_id"]},
      include: [
        {
          model: Club,
          attributes: ["name"],
          as: "clubs",
        },
        {
          model: Musicalgenre,
          as: "musical_genres",
          through: { attributes: [] },
        },
      ],
    }); 

    return dj;
  },

  deleteDj: async (name) => {
    const djFound = await Dj.findOne({
      where: { name },
    });
    if (!djFound) {
      throw new NotFoundError("Ressource introuvable", "Ce DJ n'existe pas");
    }

    await Dj.destroy({
      where: { name },
    });
  },
};

module.exports = djsController;
