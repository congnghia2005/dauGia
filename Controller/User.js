import mongoose from "mongoose";
import User from "../Model/User.js";
import Product from "../Model/Product.js";
import Bid from "../Model/Bid.js";
import Order from "../Model/Order.js";

// lay cac khach hang theo tuoi
export const getUsersByExactAge = async (req, res) => {
  try {
    const age = parseInt(req.params.age);

    if (!age) {
      return res.status(400).json({ message: "Thiếu age" });
    }

    const users = await User.aggregate([
      {
        $addFields: {
          dobDate: {
            $dateFromString: {
              dateString: "$dob",
              format: "%Y-%m-%d"
            }
          }
        }
      },
      {
        $addFields: {
          age: {
            $dateDiff: {
              startDate: "$dobDate",
              endDate: new Date(),
              unit: "year"
            }
          }
        }
      },
      {
        $match: {
          age: age
        }
      },
      {
        $project: {
          username: 1,
          email: 1,
          age: 1,
          local:1,  
          _id: 0
        }
      }
    ]);

    res.json(users);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// Lấy sản phẩm mà một user đã bid 
export const getUserBiddedProducts = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(userId))
      return res.status(400).json({ message: "Invalid userId" });

    const products = await Bid.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId)
        }
      },
      {
        $group: {
          _id: "$productId",
          bidCount: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "product"
        }
      },
      {
        $unwind: {
          path: "$product",
          preserveNullAndEmptyArrays: false
        }
      },
      {
        $project: {
          _id: 0,
          productId: "$_id",
          nameProduct: "$product.name",
          description: "$product.description",
          bidCount: 1
        }
      }
    ]);

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getTopBidders = async (req, res) => {
  try {
    const result = await Bid.aggregate([
      {
        $group: {
          _id: "$userId",
          totalBids: { $sum: 1 }
        }
      },
      {
        $sort: { totalBids: -1 }
      },
      {
        $limit: 5
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user"
        }
      },
      {
        $unwind: "$user"
      },
      {
        $project: {
          _id: 0,
          userId: "$_id",
          username: "$user.username",
          email: "$user.email",
          totalBids: 1
        }
      }
    ]);

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
// Lấy top 3 sản phẩm có giá bid cao nhất hiện tại (Medium)
export const getTop3ExpensiveBids = async (req, res) => {
  try {
    const products = await Product.aggregate([
      { $match: { status: "ACTIVE" } },
      { $sort: { currentPrice: -1 } },
      { $limit: 3 },
      { $project: { _id: 0, productId: "$_id", name: 1, currentPrice: 1 } },
    ]);

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//Lấy danh sách user kèm tổng số tiền họ đã bid 
export const getUsersTotalBidAmount = async (req, res) => {
  try {
    const users = await Bid.aggregate([
      {
        $group: {
          _id: "$userId",
          totalBidAmount: { $sum: "$amount" },
          totalBids: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $project: {
          _id: 0,
          userId: "$_id",
          username: "$user.username",
          totalBids: 1,
          totalBidAmount: 1,
        },
      },
      { $sort: { totalBidAmount: -1 } },
    ]);

    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ==========================================
// 5 CÂU THỐNG KÊ (easy → hard)
// ==========================================

//Tổng số user hiện có
export const getTotalUsers = async (req, res) => {
  try {
    const total = await User.countDocuments();
    res.json({ totalUsers: total });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 2️⃣ Tổng số sản phẩm theo trạng thái (UPCOMING, ACTIVE, ENDED)
export const getProductStatusCount = async (req, res) => {
  try {
    const stats = await Product.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 3️⃣ Tổng số bid và bid trung bình mỗi user
export const getBidStatsPerUser = async (req, res) => {
  try {
    const stats = await Bid.aggregate([
      {
        $group: {
          _id: "$userId",
          totalBids: { $sum: 1 },
          avgBid: { $avg: "$amount" },
        },
      },
      { $sort: { totalBids: -1 } },
    ]);
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 4️⃣ Top 5 sản phẩm được bid nhiều nhất
export const getTop5BiddedProducts = async (req, res) => {
  try {
    const products = await Bid.aggregate([
      { $group: { _id: "$productId", totalBids: { $sum: 1 } } },
      { $sort: { totalBids: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "product",
        },
      },
      { $unwind: "$product" },
      {
        $project: {
          _id: 0,
          productId: "$_id",
          productName: "$product.name",
          totalBids: 1,
        },
      },
    ]);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 5️⃣ Tổng doanh thu từ các đơn hàng đã PAID
export const getTotalRevenue = async (req, res) => {
  try {
    const revenue = await Order.aggregate([
      { $match: { status: "PAID" } },
      { $group: { _id: null, totalRevenue: { $sum: "$finalPrice" } } },
      { $project: { _id: 0, totalRevenue: 1 } },
    ]);
    res.json(revenue[0] || { totalRevenue: 0 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};