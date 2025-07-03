import express from "express";
import dotenv from "dotenv";
import sequelize from "./models";
import userRoutes from "./routes/user.routes";
import postRoutes from "./routes/post.routes";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

// Test DB
sequelize.sync().then(() => {
  console.log("DB Connected");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

export default app;