const request = require("supertest");
const router = require("../routes/api/users");
const testUser = require("./data/data");
const fs = require("fs/promises");

const app = require("../app");
const mongoose = require("mongoose");
require("dotenv").config();

const { DB_HOST, PORT = 3000 } = process.env;

// jest.setTimeout(10000);
app.use("/api/users", router);

describe("test updateAvatar endpoint", () => {
  beforeAll(() =>
    mongoose
      .connect(DB_HOST, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      })
      .then(() => {
        console.log("Database connection successful");
        app.listen(PORT, () => {
          console.log(`Server running. Use our API on port: ${PORT}`);
        });
      })
      .catch((error) => {
        console.log(error);
      })
  );
  test("token is not valid", async () => {
    const avatarPath = await fs.readFile("./tests/data/avatar.jpg");
    const { statusCode } = await request(app)
      .patch("/api/users/avatar")
      .set("Authorization", `Bearer ${111}`)
      .attach("avatar", avatarPath, "avatar.jpg");
    expect(statusCode).toBe(401);
  });

  test("token is valid", async () => {
    const avatarPath = await fs.readFile("./tests/data/avatar.jpg");
    const { statusCode, body } = await request(app)
      .patch("/api/users/avatar")
      .set("Authorization", `Bearer ${testUser.token}`)
      .attach("avatar", avatarPath, "avatar.jpg");
    expect(statusCode).toBe(200);
    expect(body).toBeDefined();
    expect(body.data.result.avatarUrl).toMatch(/avatar.jpg/);
  });

  afterAll(async () => await mongoose.disconnect());
});
