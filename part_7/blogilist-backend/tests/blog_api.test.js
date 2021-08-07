const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const Blog = require("../models/blog");
const app = require("../app");
const User = require("../models/user");
const api = supertest(app);

beforeAll(async () => {
  await User.deleteMany({});
  const user = {
    username: "username",
    name: "test user",
    password: "password",
  };

  await api
    .post("/api/users")
    .send(user)
    .set("Accept", "application/json")
    .expect("Content-Type", /application\/json/);
});

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

describe("when there is initially some blogs saved", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
});

describe("deletion of a blog", () => {
  test("succeeds with status code 204 if id is valid", async () => {
    const loginUser = {
      username: "username",
      password: "password",
    };

    const loggedUser = await api
      .post("/api/login")
      .send(loginUser)
      .expect("Content-Type", /application\/json/);

    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set("Authorization", `bearer ${loggedUser.body.token}`)
      .expect(204);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);
  });
});

describe("viewing a specific note", () => {
  test("query if a blog has id or _id", async () => {
    const singleBlog = await helper.blogsInDb();

    expect(singleBlog[0].id).toBeDefined();
    expect(singleBlog[0]._id).toBe(undefined);
  });
});

describe("addition of a new blog", () => {
  test("a valid blog can be added", async () => {
    const loginUser = {
      username: "username",
      password: "password",
    };

    const loggedUser = await api
      .post("/api/login")
      .send(loginUser)
      .expect("Content-Type", /application\/json/);

    const newBlog = {
      title: "Test title",
      author: "Test author",
      url: "https://test.com/",
      likes: 3,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Authorization", `bearer ${loggedUser.body.token}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const titles = blogsAtEnd.map((t) => t.title);
    expect(titles).toContain("Test title");
  });

  test("verify if likes property is missing then it defaults to 0", async () => {
    const loginUser = {
      username: "username",
      password: "password",
    };

    const loggedUser = await api
      .post("/api/login")
      .send(loginUser)
      .expect("Content-Type", /application\/json/);

    const newBlog = {
      title: "Test title",
      author: "Test author",
      url: "https://test.com/",
    };

    const response = await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Authorization", `bearer ${loggedUser.body.token}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body.likes).toBeDefined();
    expect(response.body.likes).toBe(0);
  });

  test("blog without url is not added", async () => {
    const loginUser = {
      username: "username",
      password: "password",
    };

    const loggedUser = await api
      .post("/api/login")
      .send(loginUser)
      .expect("Content-Type", /application\/json/);

    const newBlog = {
      title: "Test title",
      author: "Test author",
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Authorization", `bearer ${loggedUser.body.token}`)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });

  test("if token is not provided blog is not added", async () => {
    const newBlog = {
      title: "Test title",
      author: "Test author",
      url: "https://test.com/",
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(401)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });
});

afterAll(() => {
  mongoose.connection.close;
});