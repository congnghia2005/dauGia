import express from "express";
import {
  getUsersByExactAge,
  getUserBiddedProducts,
  getTop3ExpensiveBids,
  getTopBidders,
  getUsersTotalBidAmount,
  getTotalUsers,
  getProductStatusCount,
  getBidStatsPerUser,
  getTop5BiddedProducts,
  getTotalRevenue
} from "../Controller/User.js";

const router = express.Router();

import user from "../Model/User.js";
import { create, getAll, get, update, remove } from "../Controller/Generic.js";



/**
 * @swagger
 * tags:
 *   name: User
 *   description: User API
 */


/**
 * @swagger
 * /api/user/findByAge/{age}:
 *   get:
 *     summary: Lấy user theo tuổi
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: age
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: OK
 */
router.get("/findByAge/:age", getUsersByExactAge);


/**
 * @swagger
 * /api/user/getUserBiddedProducts/{userId}:
 *   get:
 *     summary: Lấy sản phẩm user đã bid
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */
router.get("/getUserBiddedProducts/:userId", getUserBiddedProducts);


/**
 * @swagger
 * /api/user/getTop3ExpensiveBids:
 *   get:
 *     summary: Top 3 bid đắt nhất
 *     tags: [User]
 *     responses:
 *       200:
 *         description: OK
 */
router.get("/getTop3ExpensiveBids", getTop3ExpensiveBids);


/**
 * @swagger
 * /api/user/getUsersTotalBidAmount:
 *   get:
 *     summary: Tổng tiền bid của mỗi user
 *     tags: [User]
 *     responses:
 *       200:
 *         description: OK
 */
router.get("/getUsersTotalBidAmount", getUsersTotalBidAmount);


/**
 * @swagger
 * /api/user/getTotalUsers:
 *   get:
 *     summary: Tổng số user
 *     tags: [User]
 *     responses:
 *       200:
 *         description: OK
 */
router.get("/getTotalUsers", getTotalUsers);


/**
 * @swagger
 * /api/user/getProductStatusCount:
 *   get:
 *     summary: Đếm trạng thái sản phẩm
 *     tags: [User]
 *     responses:
 *       200:
 *         description: OK
 */
router.get("/getProductStatusCount", getProductStatusCount);


/**
 * @swagger
 * /api/user/getBidStatsPerUser:
 *   get:
 *     summary: Thống kê bid mỗi user
 *     tags: [User]
 *     responses:
 *       200:
 *         description: OK
 */
router.get("/getBidStatsPerUser", getBidStatsPerUser);


/**
 * @swagger
 * /api/user/getTop5BiddedProducts:
 *   get:
 *     summary: Top 5 sản phẩm được bid nhiều nhất
 *     tags: [User]
 *     responses:
 *       200:
 *         description: OK
 */
router.get("/getTop5BiddedProducts", getTop5BiddedProducts);


/**
 * @swagger
 * /api/user/getTotalRevenue:
 *   get:
 *     summary: Tổng doanh thu
 *     tags: [User]
 *     responses:
 *       200:
 *         description: OK
 */
router.get("/getTotalRevenue", getTotalRevenue);


/**
 * @swagger
 * /api/user/getTopBidders:
 *   get:
 *     summary: Top user bid nhiều nhất
 *     tags: [User]
 *     responses:
 *       200:
 *         description: OK
 */
router.get("/getTopBidders", getTopBidders);



/**
 * @swagger
 * /api/user/create:
 *   post:
 *     summary: Tạo user
 *     tags: [User]
 *     responses:
 *       200:
 *         description: OK
 */
router.post("/create", create(user));


router.get("/getall", getAll(user));
router.get("/getbyid/:id", get(user));
router.put("/update/:id", update(user));
router.delete("/delete/:id", remove(user));

export default router;