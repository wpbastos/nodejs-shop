const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  cart: [
    {
      productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true },
    },
  ],
});

userSchema.methods.addToCard = function (product) {
  const cart = [...this.cart];
  const productIndex = cart.findIndex((item) => item.productId.toString() === product._id.toString());
  if (productIndex < 0) {
    cart.push({ productId: product._id, quantity: 1 });
  } else {
    cart[productIndex].quantity++;
  }
  this.cart = [...cart];
  return this.save();
};

userSchema.methods.deleteFromCart = function (productId) {
  const cart = this.cart.filter((cp) => cp._id.toString() !== productId);
  this.cart = [...cart];
  return this.save();
};

userSchema.methods.clearCart = function () {
  this.cart = [];
  return this.save();
};

module.exports = mongoose.model('User', userSchema);
