const { NotFoundError } = require("../helpers/errors");

module.exports = () => {
  throw new NotFoundError(
    "Ressource introuvable",
    "Désolé, nous n'avons pas trouvé la ressource demandée. Vérifiez l'URI et réessayez."
  );
};
