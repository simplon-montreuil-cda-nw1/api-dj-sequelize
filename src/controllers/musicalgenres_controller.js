const { Musicalgenre } = require("../models");

const musicalGenresController = {
  getAllMusicalGenres: async () => {
    const musicalGenres = await Musicalgenre.findAll({
      order: [["name", "ASC"]],
      attributes: ["name"],
      raw: true,
    });
    return musicalGenres;
  },
};

module.exports = musicalGenresController;
