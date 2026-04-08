import mongoose from 'mongoose';

const bidSchema = new mongoose.Schema({
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
  amount: {
    type: Number,
    required: true
  },
  bidTime: {
    type: Date,
    default: Date.now
  }
});

// index để tối ưu query
bidSchema.index({ productId: 1, amount: -1 });

export default mongoose.model('Bid', bidSchema);