const Product = require('../models/product');
const Order = require('../models/order');

// /GET /
exports.indexPage = (req, res, next) => {
  Product.find()
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
  Product.find()
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
        titlePage: product.title || 'not found!',
        path: '/product',
      });
    })
    .catch((error) => console.log(error));
};

// /GET /cart
exports.cartPage = (req, res, next) => {
  req.user
    .populate('cart.productId')
    .execPopulate()
    .then((user) => {
      res.render('shop/cart', {
        cart: user.cart,
        titlePage: 'Your cart',
        path: '/cart',
      });
    })
    .catch((error) => console.log(error));
};

// /GET /order
exports.orderListPage = (req, res, next) => {
  Order.find({ userId: req.user._id })
    .populate('products.product')
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
  Product.findById(req.body.productId)
    .then((product) => {
      return req.user.addToCard(product);
    })
    .then(() => {
      res.redirect('/cart');
    })
    .catch((error) => console.log(error));
};

// /POST /cart-delete-item
exports.deleteCartProduct = (req, res, next) => {
  req.user
    .deleteFromCart(req.body.productId)
    .then(() => res.redirect('/cart'))
    .catch((error) => console.log(error));
};

// POST /create-order
exports.order = (req, res, next) => {
  req.user
    .populate('cart.productId')
    .execPopulate()
    .then((user) => {
      const products = user.cart.map((item) => {
        return { product: { ...item.productId._doc }, quantity: item.quantity };
      });
      const order = new Order({ products, total: req.body.total, userId: req.user });
      return order.save();
    })
    .then(() => {
      return req.user.clearCart();
    })
    .then(() => {
      res.redirect('/order');
    })
    .catch((error) => console.log(error));
};
