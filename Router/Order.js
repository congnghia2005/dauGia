import express from "express";
const router = express.Router();

import order from "../Model/Order.js";
import { create, getAll, get, update, remove } from "../Controller/Generic.js";

router.post("/create", create(order));
router.get("/getall", getAll(order));
router.get("/getbyid/:id", get(order));
router.put("/update/:id", update(order));
router.delete("/delete/:id", remove(order));
export default router;