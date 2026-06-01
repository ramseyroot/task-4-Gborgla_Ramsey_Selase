const express = require('express');
const ProductController = require('../controllers/productController');
const { productValidationRules, validate } = require('../middleware/validationMiddleware');

const router = express.Router();

// GET all products
router.get('/', ProductController.getAllProducts);

// GET a product by ID
router.get('/:id', ProductController.getProductById);

// POST create a new product
router.post('/', productValidationRules, validate, ProductController.createProduct);

// PUT update a product by ID
router.put('/:id', productValidationRules, validate, ProductController.updateProduct);

// DELETE a product by ID
router.delete('/:id', ProductController.deleteProduct);

module.exports = router;
