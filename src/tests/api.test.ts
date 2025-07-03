import request from "supertest";
import app from "../index";
import sequelize from "../models";

let token: string;
let postId: number;

beforeAll(async () => {
  await sequelize.sync({ force: true }); // Reset DB test
});

afterAll(async () => {
  await sequelize.close();
});

describe("User & Post API Integration Test", () => {
  it("should register a user", async () => {
    const res = await request(app).post("/api/users/register").send({
      name: "Test User",
      email: "test@example.com",
      password: "secret"
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.user).toHaveProperty("id");
  });

  it("should login and return token", async () => {
    const res = await request(app).post("/api/users/login").send({
      email: "test@example.com",
      password: "secret"
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");

    token = res.body.token; // simpan token untuk testing post
  });

  it("should create a post", async () => {
    const res = await request(app)
      .post("/api/posts")
      .set("Authorization", `Bearer ${token}`)
      .send({ content: "Hello world" });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.content).toBe("Hello world");

    postId = res.body.id; // simpan ID untuk update/delete
  });

  it("should get all posts", async () => {
    const res = await request(app).get("/api/posts");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should get post by ID", async () => {
    const res = await request(app).get(`/api/posts/${postId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(postId);
  });

  it("should update the post", async () => {
    const res = await request(app)
      .put(`/api/posts/${postId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ content: "Updated content" });

    expect(res.statusCode).toBe(200);
    expect(res.body.content).toBe("Updated content");
  });

  it("should delete the post", async () => {
    const res = await request(app)
      .delete(`/api/posts/${postId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Post deleted");
  });
});