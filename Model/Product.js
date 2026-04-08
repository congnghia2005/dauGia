import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  startingPrice: {
    type: Number,
    required: true
  },
  currentPrice: {
    type: Number,
    default: 0
  },
  stepPrice: {
    type: Number,
    required: true
  },
  startTime: Date,
  endTime: Date,
  status: {
    type: String,
    enum: ['UPCOMING', 'ACTIVE', 'ENDED'],
    default: 'UPCOMING'
  },
  images: [String],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  highestBidder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

export default mongoose.model('Product', productSchema);