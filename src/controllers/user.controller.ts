import { Request, Response } from "express";
import User from "../models/user";
import { hashPassword, comparePassword } from "../utils/hash";
import { generateToken } from "../utils/token";

export const register = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body;

  try {
    const exist = await User.findOne({ where: { email } });
    if (exist) {
      res.status(400).json({ message: "Email already registered" });
      return;
    }

    const hashed = await hashPassword(password);
    const user = await User.create({ name, email, password: hashed });
    res.status(201).json({ message: "User created", user: { id: user.id, name, email } });
  } catch (err) {
    res.status(500).json({ message: "Register failed", error: err });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const valid = await comparePassword(password, user.password);
    if (!valid) {
      res.status(401).json({ message: "Invalid password" });
      return;
    }

    const token = generateToken(user.id);
    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err });
  }
};