const ProductModel = require('../models/productModel');
const { ApiError } = require('../middleware/errorHandler');

class ProductController {
  static async getAllProducts(req, res, next) {
    try {
      const products = await ProductModel.getAll();
      res.status(200).json({
        status: 'success',
        data: products,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getProductById(req, res, next) {
    try {
      const product = await ProductModel.getById(req.params.id);
      if (!product) {
        return next(new ApiError(404, 'Product not found'));
      }
      res.status(200).json({
        status: 'success',
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }

  static async createProduct(req, res, next) {
    try {
      const newProduct = await ProductModel.create(req.body);
      res.status(201).json({
        status: 'success',
        data: newProduct,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateProduct(req, res, next) {
    try {
      const updatedProduct = await ProductModel.update(req.params.id, req.body);
      if (!updatedProduct) {
        return next(new ApiError(404, 'Product not found'));
      }
      res.status(200).json({
        status: 'success',
        data: updatedProduct,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteProduct(req, res, next) {
    try {
      await ProductModel.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProductController;
