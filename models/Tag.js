

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Tag extends Model {
  // Model properties
  static attributes = {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    tag_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  };

  // Model methods
  static associate(models) {
    this.belongsToMany(models.Product, {
      through: models.ProductTag,
      foreignKey: 'tag_id',
    });
  }
}

Tag.init(Tag.attributes, {
  sequelize,
  timestamps: false,
  freezeTableName: true,
  underscored: true,
  modelName: 'tag',
});

module.exports = Tag;
