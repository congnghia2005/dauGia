import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  finalPrice: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['PENDING', 'PAID', 'SHIPPED'],
    default: 'PENDING'
  },
  shippingAddress: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Order', orderSchema);