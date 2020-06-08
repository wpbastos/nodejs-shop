SHOP
/ -> shopController.indexPage
/product -> shopController.productListPage
/product/:id -> shopController.productDetailPage
/cart -> shopController.cartPage
/checkout -> shopController.checkoutPage
/order -> shopController.orderListPage

/cart -> shopController.addCartProduct
/cart-delete-item -> shopController.deleteCartProduct

ADMIN
/admin/product -> adminController.productListPage
/admin/add-product -> adminController.addProductPage
/admin/edit-product/:id -> adminController.editProductPage

/admin/add-product -> adminController.addProduct
/admin/edit-product -> adminController.editProduct
/admin/delete-product -> adminController.deleteProduct

Product
product.save()
product.update()
Product.fetchAll();
Product.findByID(id)
Product.delete(id)

title
price
imageURL
description