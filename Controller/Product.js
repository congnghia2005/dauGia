import Product from "../Model/Product.js";

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

export const getProductsByMostProducts = async (req, res) => {
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