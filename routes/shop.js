const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.indexPage);

router.get('/products', shopController.productsPage);

router.get('/products/:id', shopController.productPage);

router.get('/cart', shopController.cartPage);

router.get('/orders', shopController.ordersPage);

router.get('/checkout', shopController.checkoutPage);

router.post('/cart', shopController.addCart);

router.post('/cart-delete-item', shopController.deleteCartProduct);

module.exports = router;
