

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Category = require('./Category');

class Product extends Model {
  // Model properties
  static attributes = {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isDecimal: true,
      },
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
      validate: {
        isNumeric: true,
      },
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Category,
        key: 'id',
      },
    },
  };

  // Model methods
  static associate(models) {
    this.belongsTo(models.Category, {
      foreignKey: 'category_id',
    });
    this.belongsToMany(models.Tag, {
      through: models.ProductTag,
      foreignKey: 'product_id',
    });
    this.hasMany(models.ProductTag, {
      foreignKey: 'product_id',
    });
  }
}

Product.init(Product.attributes, {
  sequelize,
  timestamps: false,
  freezeTableName: true,
  underscored: true,
  modelName: 'product',
});

module.exports = Product;