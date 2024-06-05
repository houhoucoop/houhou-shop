import * as Types from './types';

import * as Operations from '../__generated__/documents';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type TaskFieldsFragment = {
  __typename?: 'Task';
  id: string;
  name: string;
  title: string;
  status: string;
  label: string;
  priority: string;
};

export type GetTasksQueryVariables = Types.Exact<{
  limit: Types.Scalars['Int']['input'];
  offset: Types.Scalars['Int']['input'];
  sort?: Types.InputMaybe<Types.Sort>;
  order?: Types.InputMaybe<Types.Order>;
  filter?: Types.InputMaybe<Types.Filter>;
}>;

export type GetTasksQuery = {
  __typename?: 'Query';
  tasks: {
    __typename?: 'TaskResponse';
    totalCount: number;
    items: Array<{
      __typename?: 'Task';
      id: string;
      name: string;
      title: string;
      status: string;
      label: string;
      priority: string;
    }>;
  };
};

export type CreateTaskMutationVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
  name: Types.Scalars['String']['input'];
  title: Types.Scalars['String']['input'];
  status: Types.Scalars['String']['input'];
  label: Types.Scalars['String']['input'];
  priority: Types.Scalars['String']['input'];
}>;

export type CreateTaskMutation = {
  __typename?: 'Mutation';
  createTask?: {
    __typename?: 'Task';
    id: string;
    name: string;
    title: string;
    status: string;
    label: string;
    priority: string;
  } | null;
};

export type UpdateTaskMutationVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
  label: Types.Scalars['String']['input'];
}>;

export type UpdateTaskMutation = {
  __typename?: 'Mutation';
  updateTask?: {
    __typename?: 'Task';
    id: string;
    name: string;
    title: string;
    status: string;
    label: string;
    priority: string;
  } | null;
};

export type DeleteTaskMutationVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
}>;

export type DeleteTaskMutation = {
  __typename?: 'Mutation';
  deleteTask?: {
    __typename?: 'Task';
    id: string;
    name: string;
    title: string;
    status: string;
    label: string;
    priority: string;
  } | null;
};

/**
 * __useGetTasksQuery__
 *
 * To run a query within a React component, call `useGetTasksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTasksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTasksQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      sort: // value for 'sort'
 *      order: // value for 'order'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetTasksQuery(
  baseOptions: Apollo.QueryHookOptions<GetTasksQuery, GetTasksQueryVariables> &
    ({ variables: GetTasksQueryVariables; skip?: boolean } | { skip: boolean }),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetTasksQuery, GetTasksQueryVariables>(
    Operations.GetTasks,
    options,
  );
}
export function useGetTasksLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetTasksQuery,
    GetTasksQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetTasksQuery, GetTasksQueryVariables>(
    Operations.GetTasks,
    options,
  );
}
export function useGetTasksSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetTasksQuery,
    GetTasksQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetTasksQuery, GetTasksQueryVariables>(
    Operations.GetTasks,
    options,
  );
}
export type GetTasksQueryHookResult = ReturnType<typeof useGetTasksQuery>;
export type GetTasksLazyQueryHookResult = ReturnType<
  typeof useGetTasksLazyQuery
>;
export type GetTasksSuspenseQueryHookResult = ReturnType<
  typeof useGetTasksSuspenseQuery
>;
export type GetTasksQueryResult = Apollo.QueryResult<
  GetTasksQuery,
  GetTasksQueryVariables
>;
export type CreateTaskMutationFn = Apollo.MutationFunction<
  CreateTaskMutation,
  CreateTaskMutationVariables
>;

/**
 * __useCreateTaskMutation__
 *
 * To run a mutation, you first call `useCreateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTaskMutation, { data, loading, error }] = useCreateTaskMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      title: // value for 'title'
 *      status: // value for 'status'
 *      label: // value for 'label'
 *      priority: // value for 'priority'
 *   },
 * });
 */
export function useCreateTaskMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateTaskMutation,
    CreateTaskMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateTaskMutation, CreateTaskMutationVariables>(
    Operations.CreateTask,
    options,
  );
}
export type CreateTaskMutationHookResult = ReturnType<
  typeof useCreateTaskMutation
>;
export type CreateTaskMutationResult =
  Apollo.MutationResult<CreateTaskMutation>;
export type CreateTaskMutationOptions = Apollo.BaseMutationOptions<
  CreateTaskMutation,
  CreateTaskMutationVariables
>;
export type UpdateTaskMutationFn = Apollo.MutationFunction<
  UpdateTaskMutation,
  UpdateTaskMutationVariables
>;

/**
 * __useUpdateTaskMutation__
 *
 * To run a mutation, you first call `useUpdateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTaskMutation, { data, loading, error }] = useUpdateTaskMutation({
 *   variables: {
 *      id: // value for 'id'
 *      label: // value for 'label'
 *   },
 * });
 */
export function useUpdateTaskMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateTaskMutation,
    UpdateTaskMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateTaskMutation, UpdateTaskMutationVariables>(
    Operations.UpdateTask,
    options,
  );
}
export type UpdateTaskMutationHookResult = ReturnType<
  typeof useUpdateTaskMutation
>;
export type UpdateTaskMutationResult =
  Apollo.MutationResult<UpdateTaskMutation>;
export type UpdateTaskMutationOptions = Apollo.BaseMutationOptions<
  UpdateTaskMutation,
  UpdateTaskMutationVariables
>;
export type DeleteTaskMutationFn = Apollo.MutationFunction<
  DeleteTaskMutation,
  DeleteTaskMutationVariables
>;

/**
 * __useDeleteTaskMutation__
 *
 * To run a mutation, you first call `useDeleteTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTaskMutation, { data, loading, error }] = useDeleteTaskMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteTaskMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteTaskMutation,
    DeleteTaskMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DeleteTaskMutation, DeleteTaskMutationVariables>(
    Operations.DeleteTask,
    options,
  );
}
export type DeleteTaskMutationHookResult = ReturnType<
  typeof useDeleteTaskMutation
>;
export type DeleteTaskMutationResult =
  Apollo.MutationResult<DeleteTaskMutation>;
export type DeleteTaskMutationOptions = Apollo.BaseMutationOptions<
  DeleteTaskMutation,
  DeleteTaskMutationVariables
>;
