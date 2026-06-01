const { body, validationResult } = require('express-validator');
const { ApiError } = require('./errorHandler');

/**
 * Middleware to check for validation errors and throw ApiError if any.
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = errors.array().map(err => `${err.path}: ${err.msg}`).join(', ');
  return next(new ApiError(400, extractedErrors));
};

/**
 * Validation rules for creating or updating a product.
 */
const productValidationRules = [
  body('name').notEmpty().withMessage('Name is required').isString().withMessage('Name must be a string'),
  body('description').optional().isString().withMessage('Description must be a string'),
  body('price').notEmpty().withMessage('Price is required').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('quantity').notEmpty().withMessage('Quantity is required').isInt({ min: 0 }).withMessage('Quantity must be a positive integer'),
  body('category').notEmpty().withMessage('Category is required').isString().withMessage('Category must be a string'),
];

module.exports = {
  validate,
  productValidationRules,
};
