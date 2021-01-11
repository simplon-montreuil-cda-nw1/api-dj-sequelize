const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Musicalgenre extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Dj, {
        through: "DjMusicalgenres",
        foreignKey: "musicalgenre_id",
        as: "djs",
      });
    }
  };
  Musicalgenre.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'Musicalgenre',
  });
  return Musicalgenre;
};