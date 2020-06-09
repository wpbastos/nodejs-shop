const Product = require('../models/product');

// /GET /
exports.indexPage = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render('shop/index', {
        products: products,
        titlePage: 'Home',
        path: '/',
      });
    })
    .catch((error) => console.log(error));
};

// /GET /products
exports.productListPage = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render('shop/product-list', {
        products: products,
        titlePage: 'Products',
        path: '/product',
      });
    })
    .catch((error) => console.log(error));
};

// /GET /products/:id
exports.productDetailPage = (req, res, next) => {
  const id = req.params.id;
  Product.findByPk(id)
    .then((product) => {
      res.render('shop/product-detail', {
        product: product,
        titlePage: product ? product.title : 'not found!',
        path: '/product',
      });
    })
    .catch((error) => console.log(error));
};

// /GET /cart
exports.cartPage = (req, res, next) => {
  req.user
    .getCart()
    .then((cart) => {
      if (!cart) {
        return req.user.createCart();
      }
      return cart;
    })
    .then((cart) => {
      return cart.getProducts();
    })
    .then((products) => {
      res.render('shop/cart', {
        cartProducts: products,
        titlePage: 'Your cart',
        path: '/cart',
      });
    })
    .catch((error) => console.log(error));
};

// /GET /checkout
exports.checkoutPage = (req, res, next) => {
  res.render('shop/checkout', {
    titlePage: 'Checkout',
    path: '/checkout',
  });
};

// /GET /order
exports.orderListPage = (req, res, next) => {
  req.user
    .getOrders({ include: ['products'] })
    .then((orders) => {
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
  const productId = req.body.id;
  let quantity = 1;
  let fetchedCart;
  req.user
    .getCart()
    .then((cart) => {
      if (!cart) {
        return req.user.createCart();
      }
      fetchedCart = cart;
      return cart;
    })
    .then((cart) => {
      return cart.getProducts({ where: { id: productId } });
    })
    .then((products) => {
      const product = products[0];
      if (product) {
        const oldQuantity = product.cartItem.quantity;
        quantity = oldQuantity + 1;
        return product;
      }
      return Product.findByPk(productId);
    })
    .then((product) => {
      return fetchedCart.addProduct(product, { through: { quantity: quantity } });
    })
    .then(() => {
      res.redirect('/cart');
    })
    .catch((error) => console.log(error));
};

// /POST /cart-delete-item
exports.deleteCartProduct = (req, res, next) => {
  const productId = req.body.id;
  req.user
    .getCart()
    .then((cart) => {
      return cart.getProducts({ where: { id: productId } });
    })
    .then((products) => {
      const product = products[0];
      return product.cartItem.destroy();
    })
    .then((result) => res.redirect('/cart'))
    .catch((error) => console.log(error));
};

// POST /create-order
exports.order = (req, res, next) => {
  let fetchedProducts;
  let fetchedCart;
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts();
    })
    .then((products) => {
      fetchedProducts = products;
      return req.user.createOrder();
    })
    .then((order) => {
      return order.addProducts(
        fetchedProducts.map((product) => {
          product.orderItem = { quantity: product.cartItem.quantity };
          return product;
        })
      );
    })
    .then((result) => {
      fetchedCart.destroy();
    })
    .then((result) => {
      res.redirect('/order');
    })
    .catch((error) => console.log(error));
};
