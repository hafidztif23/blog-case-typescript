import { Router } from "express";
import { getAllPosts, getPostById, createPost, updatePost, deletePost } from "../controllers/post.controller";
import { authenticate } from "../middleware/auth";

const router = Router();

// Public
router.get("/", getAllPosts);
router.get("/:id", getPostById);

// Protected (need JWT)
router.post("/", authenticate, createPost);
router.put("/:id", authenticate, updatePost);
router.delete("/:id", authenticate, deletePost);

export default router;