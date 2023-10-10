


const Product = require('./Product')
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Category.hasMany(Product, {
  foreignKey: 'category_id',
});

// Categories have many Products
Product.belongsTo(Category, {
  foreignKey: 'category_id',
});
Product.belongsToMany(Tag, {
  through: ProductTag, 
  foreignKey: 'product_id',
});
Product.hasMany(ProductTag, {
  foreignKey: 'product_id',
});

// Products belongToMany Tags (through ProductTag)
ProductTag.belongsTo(Product, {
  foreignKey: 'product_id',
});
ProductTag.belongsTo(Tag, {
  foreignKey: 'tag_id',
});
// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: 'ProductTag', 
  foreignKey: 'tag_id',
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
