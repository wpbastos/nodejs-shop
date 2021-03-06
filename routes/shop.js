const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.indexPage);

router.get('/product', shopController.productListPage);

router.get('/product/:_id', shopController.productDetailPage);

router.get('/cart', shopController.cartPage);

router.get('/order', shopController.orderListPage);

router.post('/cart', shopController.addCartProduct);

router.post('/cart-delete-item', shopController.deleteCartProduct);

router.post('/create-order', shopController.order);

module.exports = router;
