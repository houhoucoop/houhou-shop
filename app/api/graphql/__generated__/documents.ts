import gql from 'graphql-tag';

export const GetTasks = gql`
  query GetTasks($limit: Int!, $offset: Int!, $sort: Sort, $order: Order) {
    tasks(limit: $limit, offset: $offset, sort: $sort, order: $order) {
      items {
        id
        name
        title
        status
        label
        priority
      }
      totalCount
    }
  }
`;
export const UpdateTask = gql`
  mutation UpdateTask($id: String!, $label: String!) {
    updateTask(id: $id, label: $label) {
      id
      name
      title
      status
      label
      priority
    }
  }
`;
