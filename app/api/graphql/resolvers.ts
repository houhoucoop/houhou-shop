import prisma from '@/lib/db';
import { Resolvers } from './__generated__/resolvers-types';

const resolvers = {
  Query: {
    tasks: async (
      _: any,
      { limit = 10, offset = 0, sort = 'id', order = 'asc' },
    ) => {
      const [items, totalCount] = await Promise.all([
        prisma.tasks.findMany({
          take: limit,
          skip: offset,
          orderBy: { [sort]: order },
        }),
        prisma.tasks.count(),
      ]);

      return { items, totalCount };
    },
  },
};

export default resolvers;
