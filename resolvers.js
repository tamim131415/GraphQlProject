// resolvers.js

const { users, posts, comments } = require('./database');

const resolvers = {
  Query: {
    // Fetch all users
    users: () => users,

    // Fetch all posts
    posts: () => posts,

    // Fetch a single post by ID
    post: (_, { id }) => posts.find(post => post.id === id),
  },

  Mutation: {
    // Create a new user
    createUser: (_, { name, email }) => {
      const newUser = { id: `${users.length + 1}`, name, email, posts: [] };
      users.push(newUser);
      return newUser;
    },

    // Create a new post
    createPost: (_, { title, content, authorId }) => {
      const author = users.find(user => user.id === authorId);
      if (!author) throw new Error('Author not found');

      const newPost = { id: `${posts.length + 1}`, title, content, author, comments: [] };
      posts.push(newPost);

      // Add the post to the author's list
      author.posts = author.posts || [];
      author.posts.push(newPost);

      return newPost;
    },

    // Create a new comment
    createComment: (_, { content, authorId, postId }) => {
      const author = users.find(user => user.id === authorId);
      const post = posts.find(post => post.id === postId);
      if (!author) throw new Error('Author not found');
      if (!post) throw new Error('Post not found');

      const newComment = { id: `${comments.length + 1}`, content, author, post };
      comments.push(newComment);

      // Add the comment to the post
      post.comments = post.comments || [];
      post.comments.push(newComment);

      return newComment;
    },
  },

  // Resolve fields in User
  User: {
    posts: (user) => posts.filter(post => post.author.id === user.id),
  },

  // Resolve fields in Post
  Post: {
    author: (post) => users.find(user => user.id === post.author.id),
    comments: (post) => comments.filter(comment => comment.post.id === post.id),
  },

  // Resolve fields in Comment
  Comment: {
    author: (comment) => users.find(user => user.id === comment.author.id),
    post: (comment) => posts.find(post => post.id === comment.post.id),
  },
};

module.exports = resolvers;
