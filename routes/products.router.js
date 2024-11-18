const express = require('express');
const ProductsServices = require('../services/products.service');
const validatorHandler = require('../middleware/validator.handler')
const { createProductSchema, updateSchema, getProductsSchema } = require('../schemas/products.dto')

const router = express.Router();
const service = new ProductsServices();

router.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products)
});


router.get('/:id',
  validatorHandler(getProductsSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const products = await service.findOne(id);
      res.json(products)
    } catch (error) {
      next(error);
    }
  });

router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newProducts = await service.created(body)
    res.status(201).json(newProducts)
  });

router.patch('/:id',
  validatorHandler(updateSchema, 'params'),
  validatorHandler(updateSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const body = req.body;
      const updateProducts = await service.update(id, body)
      res.json(updateProducts)
    } catch (error) {
      next();
    };
  });

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const deleteProduct = await service.delete(id)
    res.json(deleteProduct);
  } catch (error) {
    res.status(404).json({
      message: error.message
    });
  };
});



module.exports = router;
