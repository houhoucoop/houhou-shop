import gql from 'graphql-tag';
export const TaskFields = gql`
  fragment TaskFields on Task {
    id
    name
    title
    status
    label
    priority
  }
`;
export const GetTasks = gql`
  query GetTasks(
    $limit: Int!
    $offset: Int!
    $sort: Sort
    $order: Order
    $filter: Filter
  ) {
    tasks(
      limit: $limit
      offset: $offset
      sort: $sort
      order: $order
      filter: $filter
    ) {
      items {
        ...TaskFields
      }
      totalCount
    }
  }
  ${TaskFields}
`;
export const CreateTask = gql`
  mutation CreateTask(
    $id: String!
    $name: String!
    $title: String!
    $status: String!
    $label: String!
    $priority: String!
  ) {
    createTask(
      id: $id
      name: $name
      title: $title
      status: $status
      label: $label
      priority: $priority
    ) {
      ...TaskFields
    }
  }
  ${TaskFields}
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
export const DeleteTask = gql`
  mutation DeleteTask($id: String!) {
    deleteTask(id: $id) {
      ...TaskFields
    }
  }
  ${TaskFields}
`;
