'use client';

import { Suspense, Fragment } from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useFragment, useQuery, useSuspenseQuery, gql } from '@apollo/client';

const userFragment = gql`
  fragment UserFragment on User {
    id
    name
  }
`;

const userQuery = gql`
  query {
    getUser(id: "1") {
      ...UserFragment
    }
  }
  ${userFragment}
`;

function Result({ source, data }: { source: string; data: unknown }) {
  return (
    <div>
      <span>Source: {source}</span>
      <span>
        Data:
        {JSON.stringify(data)}
      </span>
    </div>
  );
}

function SuspenseQueryUser({ children }: React.PropsWithChildren) {
  const result = useSuspenseQuery(userQuery, { fetchPolicy: 'cache-first' });
  return (
    <>
      <Result source="useSuspenseQuery(userQuery)" data={result.data} />
      <Fragment key="children">{children}</Fragment>
    </>
  );
}

function FragmentUser({ children }: React.PropsWithChildren) {
  const result = useFragment({
    fragment: userFragment,
    from: { __typename: 'User', id: '1' },
  });
  return (
    <>
      <Result source="useFragment(userFragment)" data={result.data} />
      <Fragment key="children">{children}</Fragment>
    </>
  );
}

function QueryUser({ children }: React.PropsWithChildren) {
  const result = useQuery(userQuery, { fetchPolicy: 'cache-first' });
  return (
    <>
      <Result source="useQuery(userQuery)" data={result.data} />
      <Fragment key="children">{children}</Fragment>
    </>
  );
}

export default function Page() {
  return (
    <>
      <Suspense>
        <SuspenseQueryUser>
          <FragmentUser />
          <QueryUser />
        </SuspenseQueryUser>
        <FragmentUser />
        <QueryUser />
      </Suspense>
    </>
  );
}
