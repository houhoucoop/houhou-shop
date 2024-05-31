import prisma from '@/lib/db';

const resolvers = {
  Query: {
    tasks: async (_: any, { limit = 10, offset = 0 }) => {
      const [items, totalCount] = await Promise.all([
        prisma.tasks.findMany({ take: limit, skip: offset }),
        prisma.tasks.count(),
      ]);

      return { items, totalCount };
    },
  },
};

export default resolvers;
