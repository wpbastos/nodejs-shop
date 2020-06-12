const Product = require('../models/product');

// /GET /admin/products
exports.productListPage = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render('admin/products-list', {
        products,
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

// GET /admin/edit-product/:_id
exports.editProductPage = (req, res, next) => {
  const _id = req.params._id;
  Product.findById(_id)
    .then((product) => {
      if (!product) {
        return res.redirect('/admin/product');
      }
      res.render('admin/save-product', {
        product,
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
  const product = new Product(title, price, imageUrl, description, req.user._id);
  product
    .save()
    .then((result) => {
      res.redirect('/admin/product');
    })
    .catch((error) => console.log(error));
};

// /POST /admin/edit-product
exports.editProduct = (req, res, next) => {
  const _id = req.body._id;
  const title = req.body.title;
  const price = req.body.price;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  product = new Product(title, price, imageUrl, description, req.user._id, _id);
  console.log('>>> 1', product);
  product
    .save()
    .then(() => {
      res.redirect('/admin/product');
    })
    .catch((error) => console.log(error));
};

// /POST /admin/delete-product/:_id
exports.deleteProduct = (req, res, next) => {
  const _id = req.body._id;
  Product.deleteById(_id)
    .then(() => res.redirect('/admin/product'))
    .catch((error) => console.log(error));
};
