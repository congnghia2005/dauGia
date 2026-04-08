import express from "express";
const router = express.Router();

import product from "../Model/Product.js";
import { create, getAll, get, update, remove } from "../Controller/Generic.js";

router.post("/create", create(product));
router.get("/getall", getAll(product));
router.get("/getbyid/:id", get(product));
router.put("/update/:id", update(product));
router.delete("/delete/:id", remove(product));
export default router;