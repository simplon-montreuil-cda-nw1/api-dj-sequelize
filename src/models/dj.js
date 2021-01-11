const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Dj extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Club);
      this.belongsToMany(models.Musicalgenre, {
        through: "DjMusicalgenres",
        foreignKey: "dj_id",
        as: "musical_genres",
      });
    }
  };
  Dj.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    url_name: {
      type: DataTypes.STRING
    },
    name: {
      type: DataTypes.STRING
    },
    biography: {
      type: DataTypes.STRING
    },
    soundcloud: {
      type: DataTypes.STRING
    },
    facebook: {
      type: DataTypes.STRING
    },
    instagram: {
      type: DataTypes.STRING
    },
    spotify: {
      type: DataTypes.STRING
    },
    beatport: {
      type: DataTypes.STRING
    },
    mixcloud: {
      type: DataTypes.STRING
    },
    youtube: {
      type: DataTypes.STRING
    },
    club_id: {
      type: DataTypes.UUID,
      references: {
        model: 'Clubs',
        key: 'id',
      },
    },
  }, {
    sequelize,
    modelName: 'Dj',
  });
  return Dj;
};