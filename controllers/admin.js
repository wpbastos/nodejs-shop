const Product = require('../models/product');

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
  const id = req.params.id;
  Product.findById(id, (product) => {
    if (!product) {
      return res.redirect('/');
    }
    res.render('admin/save-product', {
      product: product,
      edit: true,
      titlePage: 'Edit product',
    });
  });
};

// /GET /admin/products
exports.productsListPage = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('admin/products-list', {
      products: products,
      titlePage: 'Admin products',
      path: '/admin/products',
    });
  });
};

// /GET /admin/delete-product/:id
exports.deleteProduct = (req, res, next) => {
  const id = req.params.id;
  Product.delete(id);
  res.redirect('/admin/products');
};

// /POST /admin/add-product
exports.addProduct = (req, res, next) => {
  const title = req.body.title;
  const image = req.body.image;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(title, image, price, description);
  product.save();
  res.redirect('/admin/products');
};

// /POST /admin/edit-product
exports.editProduct = (req, res, next) => {
  const id = req.body.id;
  const title = req.body.title;
  const image = req.body.image;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(title, image, price, description, id);
  product.save();
  res.redirect('/admin/products');
};
