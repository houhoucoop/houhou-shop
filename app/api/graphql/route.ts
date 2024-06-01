import { readFileSync } from 'fs';
import { join } from 'path';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { ApolloServer } from '@apollo/server';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { NextRequest } from 'next/server';
import resolvers from './resolvers';

const schemaPath = join(
  process.cwd(),
  'app',
  'api',
  'graphql',
  'schema.graphql',
);
const typeDefs = readFileSync(schemaPath, { encoding: 'utf-8' });

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const server = new ApolloServer({ schema });

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req) => ({ req }),
});

export { handler as GET, handler as POST };
