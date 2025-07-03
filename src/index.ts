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

app.get("/", (req, res) => {
  res.send(`
    <h2>Blog Case API</h2>
    <p>Berikut daftar endpoint yang tersedia:</p>
    <ul>
      <li><b>POST</b> /api/users/register – Register user</li>
      <li><b>POST</b> /api/users/login – Login user</li>
      <li><b>GET</b> /api/posts – Lihat semua post</li>
      <li><b>GET</b> /api/posts/:id – Lihat post berdasarkan posts ID</li>
      <li><b>POST</b> /api/posts – Buat post (login required)</li>
      <li><b>PUT</b> /api/posts/:id – Update post (login & author only)</li>
      <li><b>DELETE</b> /api/posts/:id – Hapus post (login & author only)</li>
    </ul>
    <p>Gunakan Insomnia/Postman untuk mengakses endpoint ini.</p>
  `);
});

// Test DB
sequelize.sync().then(() => {
  console.log("DB Connected");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

export default app;