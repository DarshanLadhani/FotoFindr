import { Router } from "express";
import {  displayImages } from "../controllers/search.js";

const router = Router();

router.get("/" , displayImages)

export default router;