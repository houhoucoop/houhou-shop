export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type Filter = {
  keyword?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createTask?: Maybe<Task>;
  deleteTask?: Maybe<Task>;
  updateTask?: Maybe<Task>;
};

export type MutationCreateTaskArgs = {
  id: Scalars['String']['input'];
  label: Scalars['String']['input'];
  name: Scalars['String']['input'];
  priority: Scalars['String']['input'];
  status: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type MutationDeleteTaskArgs = {
  id: Scalars['String']['input'];
};

export type MutationUpdateTaskArgs = {
  id: Scalars['String']['input'];
  label: Scalars['String']['input'];
};

export enum Order {
  Asc = 'asc',
  Desc = 'desc',
}

export type Query = {
  __typename?: 'Query';
  tasks: TaskResponse;
};

export type QueryTasksArgs = {
  filter?: InputMaybe<Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Order>;
  sort?: InputMaybe<Sort>;
};

export enum Sort {
  CreatedAt = 'created_at',
  Name = 'name',
  Priority = 'priority',
  Status = 'status',
  Title = 'title',
}

export type Task = {
  __typename?: 'Task';
  id: Scalars['String']['output'];
  label: Scalars['String']['output'];
  name: Scalars['String']['output'];
  priority: Scalars['String']['output'];
  status: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type TaskResponse = {
  __typename?: 'TaskResponse';
  items: Array<Task>;
  totalCount: Scalars['Int']['output'];
};
