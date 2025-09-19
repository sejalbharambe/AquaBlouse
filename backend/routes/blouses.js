import express from "express";
import { createBlouse, getBlouses, updateBlouse, deleteBlouse } from "../controllers/blouseController.js";

const router = express.Router();

// ✅ Base64 upload, no multer needed
router.post("/", createBlouse);
router.get("/", getBlouses);
router.put("/:id", updateBlouse);
router.delete("/:id", deleteBlouse);

export default router;
