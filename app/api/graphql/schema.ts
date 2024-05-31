import { gql } from 'graphql-tag';

const typeDefs = gql`
  type Task {
    id: String!
    title: String!
    status: String!
    label: String!
    priority: String!
  }

  type TaskResponse {
    items: [Task!]!
    totalCount: Int!
  }

  type Query {
    tasks(limit: Int!, offset: Int!): TaskResponse!
  }
`;

export default typeDefs;
