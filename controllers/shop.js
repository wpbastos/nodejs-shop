const Product = require('../models/product');
const Cart = require('../models/cart');

// /GET /
exports.indexPage = (req, res, next) => {
  console.log('>>> 1 - ');
  Product.fetchAll()
    .then(([rows, metadata]) => {
      res.render('shop/index', {
        products: rows,
        titlePage: 'Home',
        path: '/',
      });
    })
    .catch((error) => console.log(error));
};

// /GET /products
exports.productListPage = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, metadata]) => {
      res.render('shop/index', {
        products: rows,
        titlePage: 'Products',
        path: '/products',
      });
    })
    .catch((error) => console.log(error));
};

// /GET /products/:id
exports.productDetailPage = (req, res, next) => {
  const id = req.params.id;
  Product.findById(id)
    .then(([rows]) => {
      console.log('>>> ', rows);
      res.render('shop/product-detail', {
        product: rows[0],
        titlePage: rows[0] ? rows[0].title : 'not found!',
        path: '/products',
      });
    })
    .catch((error) => console.log(error));
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

// /GET /checkout
exports.checkoutPage = (req, res, next) => {
  res.render('shop/checkout', {
    titlePage: 'Checkout',
    path: '/checkout',
  });
};

// /GET /orders
exports.orderListPage = (req, res, next) => {
  res.render('shop/orders', {
    titlePage: 'Your orders',
    path: '/orders',
  });
};

// /POST /cart
exports.addCartProduct = (req, res, next) => {
  const id = req.body.id;
  Product.findById(id, (product) => {
    Cart.addProduct(id, +product.price);
  });
  res.redirect('/cart');
};


exports.deleteCartProduct = (req, res, next) => {
  const id = req.body.id;
  const price = req.body.price;
  Cart.deleteProduct(id, price);
  res.redirect('/cart');
};
