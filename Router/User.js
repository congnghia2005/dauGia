import express from "express";
const router = express.Router();

import user from "../Model/User.js";
import { create, getAll, get, update, remove } from "../Controller/Generic.js";

router.post("/create", create(user));
router.get("/getall", getAll(user));
router.get("/getbyid/:id", get(user));
router.put("/update/:id", update(user));
router.delete("/delete/:id", remove(user));
export default router;