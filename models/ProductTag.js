

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Product = require('./Product');
const Tag = require('./Tag');

class ProductTag extends Model {
  // Model properties
  static attributes = {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Product,
        key: 'id',
      },
    },
    tag_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Tag,
        key: 'id',
      },
    },
  };

  // Model methods
  static associate(models) {
    this.belongsTo(models.Product, {
      foreignKey: 'product_id',
    });
    this.belongsTo(models.Tag, {
      foreignKey: 'tag_id',
    });
  }
}

ProductTag.init(ProductTag.attributes, {
  sequelize,
  timestamps: false,
  freezeTableName: true,
  underscored: true,
  modelName: 'product_tag',
});

module.exports = ProductTag;
