import request from "supertest"
import { beforeAll } from "@jest/globals"
import { app } from "../src/server.js";
import { userTest } from "./helpers.js";
import { Post } from "../src/post/post.model.js";
import { User } from "../src/user/user.model.js";

export function setupBeforeAndAfter() {
  beforeAll(async () => {
		await Post.remove({})
		await User.remove({})
    await request(app).post("/api/auth/register").send(userTest)
  });
}