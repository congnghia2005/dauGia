import express from "express";
import { getProductsByCategory } from "../Controller/Product.js";
import { getActiveProducts } from "../Controller/Product.js";
import { getUpcomingProducts} from "../Controller/Product.js";
import { getEndedProducts } from "../Controller/Product.js";

const router = express.Router();

import product from "../Model/Product.js";
import { create, getAll, get, update, remove } from "../Controller/Generic.js";

router.post("/create", create(product));
router.get("/getall", getAll(product));
router.get("/getbyid/:id", get(product));
router.put("/update/:id", update(product));
router.delete("/delete/:id", remove(product));
router.get("/findByCategory", getProductsByCategory);
router.get("/active", getActiveProducts);
router.get("/upcoming", getUpcomingProducts);
router.get("/ended", getEndedProducts);
export default router;
