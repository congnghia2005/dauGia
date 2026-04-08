import express from "express";
const router = express.Router();

import bid from "../Model/Bid.js";
import { create, getAll, get, update, remove } from "../Controller/Generic.js";

router.post("/create", create(bid));
router.get("/getall", getAll(bid));
router.get("/getbyid/:id", get(bid));
router.put("/update/:id", update(bid));
router.delete("/delete/:id", remove(bid));
export default router;