const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/add-product', adminController.addProductPage);

router.get('/products', adminController.productsListPage);

router.get('/edit-product/:id', adminController.editProductPage);

router.get('/delete-product/:id', adminController.deleteProduct);

router.post('/add-product', adminController.addProduct);

router.post('/edit-product', adminController.editProduct);

module.exports = router;
