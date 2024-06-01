import gql from 'graphql-tag';

export const GetTasks = gql`
  query GetTasks($limit: Int!, $offset: Int!, $sort: Sort, $order: Order) {
    tasks(limit: $limit, offset: $offset, sort: $sort, order: $order) {
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
