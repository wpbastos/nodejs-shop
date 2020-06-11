const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/product', adminController.productListPage);

router.get('/add-product', adminController.addProductPage);

router.get('/edit-product/:_id', adminController.editProductPage);

router.post('/add-product', adminController.addProduct);

router.post('/edit-product', adminController.editProduct);

router.post('/delete-product', adminController.deleteProduct);

module.exports = router;
