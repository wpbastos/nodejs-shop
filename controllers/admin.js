const Product = require('../models/product');

// /GET /admin/products
exports.productListPage = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, metadata]) => {
      res.render('admin/products-list', {
        products: rows,
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
  const id = req.params.id;
  Product.findById(id)
    .then(([rows, metadata]) => {
      if (!rows) {
        return res.redirect('/');
      }
      res.render('admin/save-product', {
        product: rows[0],
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
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  const product = new Product(title, price, imageUrl, description);
  product
    .save()
    .then(() => {
      res.redirect('/admin/product');
    })
    .catch((error) => console.log(error));
};

// /POST /admin/edit-product
exports.editProduct = (req, res, next) => {
  const id = req.body.id;
  const title = req.body.title;
  const price = req.body.price;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  const product = new Product(title, price, imageUrl, description, id);
  product
    .update()
    .then(() => {
      res.redirect('/admin/product');
    })
    .catch((error) => console.log(error));
};

// /POST /admin/delete-product/:id
exports.deleteProduct = (req, res, next) => {
  const id = req.body.id;
  Product.delete(id)
    .then(() => {
      res.redirect('/admin/product');
    })
    .catch((error) => console.log(error));
};
