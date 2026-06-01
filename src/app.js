const express = require('express');
const cors = require('cors');
const { errorHandler } = require('./middleware/errorHandler');
const productRoutes = require('./routes/productRoutes');

const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);

// Basic health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', message: 'API is healthy' });
});

// Error handling middleware (should be last)
app.use(errorHandler);

module.exports = app;
