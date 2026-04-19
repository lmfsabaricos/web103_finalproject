import { Router } from "express";
import {
  getFlowers,
  getFlowerById,
  createFlower,
  updateFlower,
  deleteFlower,
} from "../controllers/flowers.js";

const router = Router();

router.get("/", getFlowers);
router.get("/:id", getFlowerById);
router.post("/", createFlower);
router.patch("/:id", updateFlower);
router.delete("/:id", deleteFlower);

export default router;
