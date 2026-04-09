import mongoose from 'mongoose';
import Bid from "../Model/Bid.js";

export const getUserBiddedProducts = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid userId' });
    }

    const userBids = await Bid.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      { $group: { _id: '$productId' } },
      { 
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: '_id',
          as: 'product'
        }
      },
      { $unwind: '$product' },
      { $project: { _id: 0, product: 1 } }
    ]);

    res.status(200).json(userBids);
  } catch (error) {
    console.error('Detailed error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};