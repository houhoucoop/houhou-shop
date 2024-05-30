import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { ApolloServer } from '@apollo/server';
import { NextRequest } from 'next/server';
import { gql } from 'graphql-tag';

const typeDefs = gql`
  type User {
    id: String!
    name: String!
  }
  type Post {
    id: String!
    title: String!
  }
  type Query {
    getUser(id: String!): User
    getPosts: [Post!]!
  }
`;

const resolvers = {
  Query: {
    getUser: async () =>
      new Promise((resolve) => {
        setTimeout(() => resolve({ id: '1', name: 'John' }), 1000);
      }),
    getPosts: async () =>
      new Promise((resolve) => {
        setTimeout(
          () =>
            resolve([
              { id: '1', title: 'Post 1' },
              { id: '2', title: 'Post 2' },
            ]),
          3500,
        );
      }),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req) => ({ req }),
});

export { handler as GET, handler as POST };
