const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    orderItems: [
      {
        product: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Product', 
            required: true 
        },
        quantity: Number,
        price: Number,
      },
    ],
    shippingAddress: {
      address: String,
      city: String,
      postalCode: String,
      country: String,
    },
    paymentMethod: {
        type: String,
        enum: ['COD', 'net-banking', 'UPI', 'credit-card', 'debit-card'],
        default: 'COD'
    },
    paymentResult: {
      id: String,
      status: String,
      update_time: String,
      email_address: String,
    },
    itemsPrice: Number,
    taxPrice: {
        type: Number,
        default: 20
    },
    shippingPrice: {
        type: Number,
        default: 40
    },
    totalPrice: Number,
    isPaid: { 
        type: Boolean,
        default: false 
    },
    paidAt: {
        type: Date,
        default: Date.now
    },
    isDelivered: { 
        type: Boolean, 
        default: false 
    },
    deliveredAt: Date,
    orderStatus: {
      type: String,
      enum: ['Pending', 'Processing', 'Shipped', 'Delivered'],
      default: 'Pending',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);