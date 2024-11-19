// typeDefs.js

const { gql } = require('apollo-server');

const typeDefs = gql`
  # Define the User type
  type User {
    id: ID!
    name: String!
    email: String!
    posts: [Post]
  }

  # Define the Post type
  type Post {
    id: ID!
    title: String!
    content: String!
    author: User!
    comments: [Comment]
  }

  # Define the Comment type
  type Comment {
    id: ID!
    content: String!
    author: User!
    post: Post!
  }

  # Define queries
  type Query {
    users: [User]
    posts: [Post]
    post(id: ID!): Post
  }

  # Define mutations
  type Mutation {
    createUser(name: String!, email: String!): User
    createPost(title: String!, content: String!, authorId: ID!): Post
    createComment(content: String!, authorId: ID!, postId: ID!): Comment
  }
`;

module.exports = typeDefs;
