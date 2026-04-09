import Product from "../Model/Product.js";
import Bid from "../Model/Bid.js";

export const getProductsByCategory = async (req, res) => {
  try {
    const category = req.query.category;

    if (!category) {
      return res.status(400).json({ message: "Thiếu category" });
    }

    const products = await Product.find({ category: category });

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getActiveProducts = async (req, res) => {
    try {
        const products = await Product.find({ status: 'ACTIVE' });
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getUpcomingProducts = async (req, res) => {
    try {
        const products = await Product.find({ status: 'UPCOMING' });
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
};

export const getProductsByCategorySorted = async (req, res) => {
    try {
        const { category, sort } = req.query;

        if (!category) {
            return res.status(400).json({ message: "Thiếu category" });
        }

        const sortOrder = (sort === 'desc' || sort === '-1') ? -1 : 1;

        // Tìm sản phẩm theo category và sắp xếp theo giá
        const products = await Product.find({ category: category })
            .sort({ currentPrice: sortOrder });

        res.json({
            success: true,
            category: category,
            sortOrder: sortOrder === 1 ? 'Tăng dần (từ thấp đến cao)' : 'Giảm dần (từ cao đến thấp)',
            count: products.length,
            data: products
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getProductsByMostBids = async (req, res) => {
    try {
        const products = await Product.aggregate([
            {
                $lookup: {
                    from: 'bids',
                    localField: '_id',
                    foreignField: 'productId',
                    as: 'bids'
                }
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    price: 1,
                    status: 1,
                    category: 1,
                    bidCount: { $size: '$bids' }
                }
            },
            {
                $sort: { bidCount: -1 }
            }
        ]);
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAverageBidsByCategory = async (req, res) => {
    try {
        const result = await Product.aggregate([
            {
                $lookup: {
                    from: 'bids',
                    localField: '_id',
                    foreignField: 'productId',
                    as: 'bids'
                }
            },
            {
                $project: {
                    category: 1,
                    bidCount: { $size: '$bids' }
                }
            },
            {
                $group: {
                    _id: '$category',
                    totalProducts: { $sum: 1 },
                    totalBids: { $sum: '$bidCount' },
                    avgBids: { $avg: '$bidCount' }
                }
            },
            {
                $project: {
                    category: '$_id',
                    totalProducts: 1,
                    totalBids: 1,
                    avgBids: { $round: ['$avgBids', 2] },
                    _id: 0
                }
            },
            {
                $sort: { avgBids: -1 }
            }
        ]);

        res.json({
            success: true,
            message: 'Trung bình số lần đấu giá theo từng danh mục',
            data: result
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getCategoriesWithAtLeastThreeProducts = async (req, res) => {
    try {
        const result = await Product.aggregate([
            {
                $group: {
                    _id: '$category',
                    productCount: { $sum: 1 }
                }
            },
            {
                $match: {
                    productCount: { $gte: 3 }
                }
            },
            {
                $project: {
                    category: '$_id',
                    productCount: 1,
                    _id: 0
                }
            },
            {
                $sort: { productCount: -1 }
            }
        ]);

        res.json({
            success: true,
            message: 'Các danh mục có từ 3 sản phẩm trở lên',
            data: result
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getCategoryWithMostAuctionedProducts = async (req, res) => {
    try {
        const result = await Product.aggregate([
            {
                $match: { status: { $in: ['ACTIVE', 'ENDED'] } }
            },
            {
                $lookup: {
                    from: 'bids',
                    localField: '_id',
                    foreignField: 'productId',
                    as: 'bids'
                }
            },
            {
                $addFields: {
                    bidCount: { $size: '$bids' }
                }
            },
            {
                $group: {
                    _id: '$category',
                    auctionedProducts: { $sum: 1 },
                    totalBids: { $sum: '$bidCount' }
                }
            },
            {
                $sort: { auctionedProducts: -1 }
            },
            {
                $limit: 1
            },
            {
                $project: {
                    category: '$_id',
                    auctionedProducts: 1,
                    totalBids: 1,
                    _id: 0
                }
            }
        ]);

        res.json({
            success: true,
            data: result[0] || null
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getWeeklySuccessfulAuctions = async (req, res) => {
    try {
        const result = await Product.aggregate([
            {
                $match: {
                    status: 'ENDED',
                    highestBidder: { $ne: null }
                }
            },
            {
                $project: {
                    year: { $year: '$endTime' },
                    isoWeek: { $isoWeek: '$endTime' }
                }
            },
            {
                $group: {
                    _id: { year: '$year', week: '$isoWeek' },
                    successfulAuctionCount: { $sum: 1 }
                }
            },
            {
                $project: {
                    year: '$_id.year',
                    week: '$_id.week',
                    successfulAuctionCount: 1,
                    _id: 0
                }
            },
            {
                $sort: { year: 1, week: 1 }
            }
        ]);

        res.json({
            success: true,
            message: 'Thống kê số sản phẩm đấu giá thành công theo tuần',
            data: result
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


