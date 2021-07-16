const dummy = () => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((total, current) => {
    return (total += current.likes);
  }, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return {};

  return blogs.reduce((last_blog, current_blog) =>
    current_blog.likes > last_blog.likes ? current_blog : last_blog
  );
};

const mostBlogs = (blogs) => {
  const mostAutorBlogs = blogs.reduce((acc, current) => {
    if (acc[current.author]) {
      acc[current.author]["blogs"] = acc[current.author].blogs + 1;
    } else {
      const author = {
        author: current.author,
        blogs: 1,
      };

      acc[current.author] = { ...author };
    }

    return acc;
  }, {});

  return mostAutorBlogs.reduce((last_user, current_user) =>
    current_user.blogs > last_user.blogs ? current_user : last_user
  );
};

const mostLikes = (blogs) => {
  const mostAutorLikes = blogs.reduce((acc, current) => {
    if (acc[current.author]) {
      acc[current.author]["likes"] += current.likes;
    } else {
      const author = {
        author: current.author,
        likes: current.likes,
      };

      acc[current.author] = { ...author };
    }

    return acc;
  }, {});

  return mostAutorLikes.reduce((last_user, current_user) =>
    current_user.likes > last_user.likes ? current_user : last_user
  );
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
