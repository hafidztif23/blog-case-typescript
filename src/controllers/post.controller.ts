import { Request, Response } from "express";
import Post from "../models/post";
import User from "../models/user";

// Get All Posts
export const getAllPosts = async (req: Request, res: Response): Promise<void> => {
  const posts = await Post.findAll({ include: { model: User, attributes: ["id", "name"] } });
  res.json(posts);
};

// Get Post by ID
export const getPostById = async (req: Request, res: Response): Promise<void> => {
  const post = await Post.findByPk(req.params.id, {
    include: { model: User, attributes: ["id", "name"] }
  });
  if (!post) {
    res.status(404).json({ message: "Post not found" });
    return;
  }
  res.json(post);
};

// Create Post (Auth required)
export const createPost = async (req: Request, res: Response): Promise<void> => {
  const { content, userId } = req.body;

  try {
    const post = await Post.create({ content, authorId: userId });
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: "Failed to create post", error: err });
  }
};

// Update Post (Auth + Ownership required)
export const updatePost = async (req: Request, res: Response): Promise<void> => {
  const { content, userId } = req.body;
  const { id } = req.params;

  const post = await Post.findByPk(id);
  if (!post) {
    res.status(404).json({ message: "Post not found" });
    return;
  }
  if (post.getDataValue("authorId") !== userId) {
    res.status(403).json({ message: "Not your post" });
    return;
  }

  post.set({ content });
  await post.save();
  res.json(post);
};

// Delete Post (Auth + Ownership required)
export const deletePost = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.body;
  const { id } = req.params;

  const post = await Post.findByPk(id);
  if (!post) {
    res.status(404).json({ message: "Post not found" });
    return;
  }
  if (post.getDataValue("authorId") !== userId) {
    res.status(403).json({ message: "Not your post" });
    return;
  }

  await post.destroy();
  res.json({ message: "Post deleted" });
};