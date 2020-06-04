const Product = require('../models/product');
const Cart = require('../models/cart');

// /GET /
exports.indexPage = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/index', {
      products: products,
      titlePage: 'Home',
      path: '/',
    });
  });
};

// /GET /products
exports.productsPage = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/product-list', {
      products: products,
      titlePage: 'All products',
      path: '/products',
    });
  });
};

// /GET //products/:id
exports.productPage = (req, res, next) => {
  const id = req.params.id;
  Product.findById(id, (product) => {
    res.render('shop/product-detail', {
      product: product,
      titlePage: product ? product.title : 'not found!',
      path: '/products',
    });
  });
};

// /GET /cart
exports.cartPage = (req, res, next) => {
  Cart.fetchAll((cart) => {
    Product.fetchAll((products) => {
      const cartProducts = { products: [], totalPrice: 0 };
      products.forEach((product) => {
        const cartProduct = cart.products.find((p) => p.id === product.id);
        if (cartProduct) {
          cartProducts.products.push({ product: product, quantity: cartProduct.quantity });
        }
      });
      cartProducts.totalPrice = cart.totalPrice;
      res.render('shop/cart', {
        cartProducts: cartProducts.products,
        titlePage: 'Your cart',
        path: '/cart',
      });
    });
  });
};

// /POST /cart
exports.addCart = (req, res, next) => {
  const id = req.body.id;
  Product.findById(id, (product) => {
    Cart.addProduct(id, +product.price);
  });
  res.redirect('/cart');
};

// /GET /orders
exports.ordersPage = (req, res, next) => {
  res.render('shop/orders', {
    titlePage: 'Your orders',
    path: '/orders',
  });
};

// /GET /checkout
exports.checkoutPage = (req, res, next) => {
  res.render('shop/checkout', {
    titlePage: 'Checkout',
    path: '/checkout',
  });
};

exports.deleteCartProduct = (req, res, next) => {
  const id = req.body.id;
  const price = req.body.price;
  Cart.deleteProduct(id, price);
  res.redirect('/cart');
};
