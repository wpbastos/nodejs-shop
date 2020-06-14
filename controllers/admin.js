const Product = require('../models/product');

// /GET /admin/products
exports.productListPage = (req, res, next) => {
  Product.find()
    // .select('title price -_id') // select fields to bring
    // .populate('userId', 'name -_id') // bring userId as a entire user document (second argument is optional)
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
  Product.findById(req.params._id)
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
  const product = new Product({ title, price, imageUrl, description, userId: req.user });
  product
    .save()
    .then((result) => {
      res.redirect('/admin/product');
    })
    .catch((error) => console.log(error));
};

// /POST /admin/edit-product
exports.editProduct = (req, res, next) => {
  Product.findById(req.body._id)
    .then((product) => {
      if (!product) {
        return res.redirect('/admin/product');
      }
      product.title = req.body.title;
      product.price = req.body.price;
      product.imageUrl = req.body.imageUrl;
      product.description = req.body.description;
      return product.save();
    })
    .then(() => {
      res.redirect('/admin/product');
    })
    .catch((error) => console.log(error));
};

// /POST /admin/delete-product/:_id
exports.deleteProduct = (req, res, next) => {
  Product.findByIdAndRemove(req.body._id)
    .then(() => res.redirect('/admin/product'))
    .catch((error) => console.log(error));
};
