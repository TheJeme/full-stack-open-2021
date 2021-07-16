const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs.map((blog) => blog.toJSON()));
});

blogsRouter.put("/:id", async (request, response) => {
  const body = request.body;

  const blog = {
    likes: body.likes,
  };

  try {
    const newBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true,
    });
    response.json(newBlog.toJSON());
  } catch (error) {
    console.log(error);
  }
});

blogsRouter.delete("/:id", async (request, response) => {
  const token = jwt.verify(request.token, process.env.SECRET);

  if (!token.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const id = request.params.id;
  const blog = await Blog.findById(id);
  if (blog.user.toString() === token.id) {
    await Blog.findByIdAndRemove(id);
    response.status(204).end();
  }
  return response.status(401).json({
    error: "Unauthorized",
  });
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;
  const token = jwt.verify(request.token, process.env.SECRET);

  if (!token.id)
    return response.status(401).json({ error: "token missing or invalid" });

  const user = await User.findById(token.id);

  if (!body.title || !body.url || !body.author)
    return response
      .status(400)
      .json({ error: "title or url or author is missing" });

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.json(savedBlog.toJSON());
});

module.exports = blogsRouter;
