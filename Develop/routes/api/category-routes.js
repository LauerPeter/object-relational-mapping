const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [Product], 
    });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET one category by id
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [Product], 
    });
    if (!category) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST to create new category
router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

// PUT to update category 
router.put('/:id', async (req, res) => {
  try {
    const updatedCategory = await Category.update(req.body, {
      where: { id: req.params.id },
    });
    if (!updatedCategory[0]) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }
    res.status(200).json({ message: 'Category updated successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE a category 
router.delete('/:id', async (req, res) => {
  try {
    const deletedCategory = await Category.destroy({
      where: { id: req.params.id },
    });
    if (!deletedCategory) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
