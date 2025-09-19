import express from "express";
import multer from "multer";
import { createLace, getLaces, updateLace, deleteLace } from "../controllers/laceController.js";

const router = express.Router();

// Storage config (files will be saved in /uploads folder)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // make sure you create "uploads" folder in root
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // unique file name
  },
});

const upload = multer({ storage: storage });

// Routes
router.post("/", upload.single("image"), createLace); // <-- "image" must match frontend FormData key
router.get("/", getLaces);
router.put("/:id", upload.single("image"), updateLace);
router.delete("/:id", deleteLace);

export default router;
