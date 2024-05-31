import { gql } from '@apollo/client';

export const GET_TASKS = gql`
  query GetTasks($limit: Int!, $offset: Int!) {
    tasks(limit: $limit, offset: $offset) {
      items {
        id
        title
        status
        label
        priority
      }
      totalCount
    }
  }
`;
