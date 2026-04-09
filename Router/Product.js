import express from "express";
import { getProductsByCategory } from "../Controller/Product.js";
import { getActiveProducts } from "../Controller/Product.js";
import { getUpcomingProducts} from "../Controller/Product.js";
import { getAllProducts } from "../Controller/Product.js";
import { getProductsByCategorySorted } from "../Controller/Product.js";
import { getProductsByMostBids } from "../Controller/Product.js";
import { getAverageBidsByCategory } from "../Controller/Product.js";
import { getCategoriesWithAtLeastThreeProducts } from "../Controller/Product.js";
import { getCategoryWithMostAuctionedProducts } from "../Controller/Product.js";
import { getWeeklySuccessfulAuctions } from "../Controller/Product.js";

const router = express.Router();

import product from "../Model/Product.js";
import { create, getAll, get, update, remove } from "../Controller/Generic.js";

/**
 * @swagger
 * tags:
 *   name: Product
 *   description: Product API
 */

/**
 * @swagger
 * /api/product/create:
 *   post:
 *     summary: Tạo sản phẩm
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: OK
 */
router.post("/create", create(product));

/**
 * @swagger
 * /api/product/getall:
 *   get:
 *     summary: Lấy tất cả sản phẩm
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: OK
 */
router.get("/getall", getAll(product));

/**
 * @swagger
 * /api/product/getbyid/{id}:
 *   get:
 *     summary: Lấy sản phẩm theo ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */
router.get("/getbyid/:id", get(product));

/**
 * @swagger
 * /api/product/update/{id}:
 *   put:
 *     summary: Cập nhật sản phẩm
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */
router.put("/update/:id", update(product));

/**
 * @swagger
 * /api/product/delete/{id}:
 *   delete:
 *     summary: Xóa sản phẩm
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */
router.delete("/delete/:id", remove(product));

/**
 * @swagger
 * /api/product/findByCategory:
 *   get:
 *     summary: Tìm sản phẩm theo danh mục
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: OK
 */
router.get("/findByCategory", getProductsByCategory);

/**
 * @swagger
 * /api/product/active:
 *   get:
 *     summary: Lấy sản phẩm đang đấu giá
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: OK
 */
router.get("/active", getActiveProducts);

/**
 * @swagger
 * /api/product/upcoming:
 *   get:
 *     summary: Lấy sản phẩm sắp đấu giá
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: OK
 */
router.get("/upcoming", getUpcomingProducts);

/**
 * @swagger
 * /api/product/all:
 *   get:
 *     summary: Lấy tất cả sản phẩm
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: OK
 */
router.get("/all", getAllProducts);

/**
 * @swagger
 * /api/product/mostProducts:
 *   get:
 *     summary: Sản phẩm được bid nhiều nhất
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: OK
 */
router.get("/mostProducts", getProductsByMostBids);

/**
 * @swagger
 * /api/product/categorySorted:
 *   get:
 *     summary: Sản phẩm theo danh mục đã sắp xếp
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: OK
 */
router.get("/categorySorted", getProductsByCategorySorted);

/**
 * @swagger
 * /api/product/averageBidsByCategory:
 *   get:
 *     summary: Trung bình số lần đấu giá theo danh mục
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: OK
 */
router.get("/averageBidsByCategory", getAverageBidsByCategory);

/**
 * @swagger
 * /api/product/categoriesWithAtLeastThreeProducts:
 *   get:
 *     summary: Danh mục có từ 3 sản phẩm trở lên
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: OK
 */
router.get("/categoriesWithAtLeastThreeProducts", getCategoriesWithAtLeastThreeProducts);

/**
 * @swagger
 * /api/product/categoryWithMostAuctionedProducts:
 *   get:
 *     summary: Danh mục có nhiều sản phẩm đấu giá nhất
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: OK
 */
router.get("/categoryWithMostAuctionedProducts", getCategoryWithMostAuctionedProducts);

/**
 * @swagger
 * /api/product/weeklySuccessfulAuctions:
 *   get:
 *     summary: Thống kê đấu giá thành công theo tuần
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: OK
 */
router.get("/weeklySuccessfulAuctions", getWeeklySuccessfulAuctions);
export default router;
