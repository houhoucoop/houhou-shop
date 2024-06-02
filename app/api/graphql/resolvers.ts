import prisma from '@/lib/db';
import { Sort, Order } from './__generated__/types';

const resolvers = {
  Query: {
    tasks: async (
      _: any,
      { limit = 10, offset = 0, sort = Sort.Name, order = Order.Asc },
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
  Mutation: {
    updateTask: async (_: any, { id, label }) => {
      const updatedTask = await prisma.tasks.update({
        where: { id },
        data: { label },
      });

      return updatedTask;
    },
  },
};

export default resolvers;
