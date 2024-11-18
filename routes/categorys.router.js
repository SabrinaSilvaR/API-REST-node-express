const express = require('express');
const router = express.Router()
const CategoryService = require('../services/categorys.service')
const service = new CategoryService();



// router.get('/:categoryId/products/:id', (req, res) => {
//   const { categoryId, id } = req.params
//   res.json({
//     categoryId,
//     id
//   })
// });

router.get('/', async (req, res) => {
  const categorys = await service.find();
  res.json(categorys);
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await service.findOne(id);
    res.json(category)
  } catch (error) {
    next(error);
  }

})

router.post('/', async (req, res) => {
  const body = req.body
  const createdCategory = await service.created(body);
  res.status(201).json(createdCategory);
});

router.patch('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const updateCategory = await service.update(id, body);
    res.json(updateCategory);
  } catch (error) {
    next(error);
  };
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteCategory = await service.delete(id);
    res.json(deleteCategory)
  } catch (error) {
    next(error);
  }
});







module.exports = router;
