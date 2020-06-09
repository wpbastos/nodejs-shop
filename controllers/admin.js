const Product = require('../models/product');

// /GET /admin/products
exports.productListPage = (req, res, next) => {
  // Product.findAll();
  req.user
    .getProducts()
    .then((products) => {
      res.render('admin/products-list', {
        products: products,
        titlePage: 'Admin Products',
        path: '/admin/product',
      });
    })
    .catch((error) => console.log(error));
};

// /GET /admin/add-product
exports.addProductPage = (req, res, next) => {
  res.render('admin/save-product', {
    edit: false,
    titlePage: 'Add product',
    path: '/admin/add-product',
  });
};

// GET /admin/edit-product/:id
exports.editProductPage = (req, res, next) => {
  const productId = req.params.id;
  // Product.findByPk(productId);
  req.user
    .getProducts({ where: { id: productId } })
    .then((products) => {
      const product = products[0];
      if (!product) {
        return res.redirect('/admin/product');
      }
      res.render('admin/save-product', {
        product: product,
        edit: true,
        titlePage: 'Edit product',
        path: '/admin/product',
      });
    })
    .catch((error) => console.log(error));
};

// /POST /admin/add-product
exports.addProduct = (req, res, next) => {
  const title = req.body.title;
  const price = req.body.price;
  const imageUrl = req.body.imageUrl || '/images/book.jpeg';
  const description = req.body.description;
  // Product.create();
  req.user
    .createProduct({
      title: title,
      price: price,
      imageUrl: imageUrl,
      description: description,
      userId: req.user.id,
    })
    .then(() => res.redirect('/admin/product'))
    .catch((error) => console.log(error));
};

// /POST /admin/edit-product
exports.editProduct = (req, res, next) => {
  const id = req.body.id;
  const title = req.body.title;
  const price = req.body.price;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  Product.findByPk(id)
    .then((product) => {
      product.title = title;
      product.price = price;
      product.imageUrl = imageUrl;
      product.description = description;
      return product.save();
    })
    .then(() => res.redirect('/admin/product'))
    .catch((error) => console.log(error));
};

// /POST /admin/delete-product/:id
exports.deleteProduct = (req, res, next) => {
  const id = req.body.id;
  Product.findByPk(id)
    .then((product) => {
      return product.destroy();
    })
    .then(() => res.redirect('/admin/product'))
    .catch((error) => console.log(error));
};
