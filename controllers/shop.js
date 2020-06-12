const Product = require('../models/product');

// /GET /
exports.indexPage = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render('shop/index', {
        products,
        titlePage: 'Home',
        path: '/',
      });
    })
    .catch((error) => console.log(error));
};

// /GET /product
exports.productListPage = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render('shop/product-list', {
        products,
        titlePage: 'Products',
        path: '/product',
      });
    })
    .catch((error) => console.log(error));
};

// /GET /products/:_id
exports.productDetailPage = (req, res, next) => {
  const _id = req.params._id;
  Product.findById(_id)
    .then((product) => {
      res.render('shop/product-detail', {
        product,
        titlePage: product ? product.title : 'not found!',
        path: '/product',
      });
    })
    .catch((error) => console.log(error));
};

// /GET /cart
exports.cartPage = (req, res, next) => {
  req.user
    .getProductsFromCart()
    .then((cart) => {
      res.render('shop/cart', {
        cart,
        titlePage: 'Your cart',
        path: '/cart',
      });
    })
    .catch((error) => console.log(error));
};

// /GET /order
exports.orderListPage = (req, res, next) => {
  req.user
    .getOrder()
    .then((orders) => {
      console.log('orders :>> ', orders);
      res.render('shop/order', {
        orders: orders,
        titlePage: 'Your orders',
        path: '/order',
      });
    })
    .catch((error) => console.log(error));
};

// /POST /cart
exports.addCartProduct = (req, res, next) => {
  const productId = req.body.productId;

  Product.findById(productId)
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then(() => {
      res.redirect('/cart');
    })
    .catch((error) => console.log(error));
};

// /POST /cart-delete-item
exports.deleteCartProduct = (req, res, next) => {
  const productId = req.body.productId;
  req.user
    .deleteFromCart(productId)
    .then(() => res.redirect('/cart'))
    .catch((error) => console.log(error));
};

// POST /create-order
exports.order = (req, res, next) => {
  req.user
    .addOrder()
    .then(() => {
      res.redirect('/order');
    })
    .catch((error) => console.log(error));
};
