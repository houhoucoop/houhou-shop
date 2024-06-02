import prisma from '@/lib/db';
import { Sort, Order, Task } from './__generated__/types';
import { camelToSnake } from './utils';

const resolvers = {
  Query: {
    tasks: async (
      _: any,
      { limit = 10, offset = 0, sort = Sort.CreatedAt, order = Order.Desc },
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
    createTask: async (
      _: any,
      { id, name, title, status, label, priority }: Task,
    ) => {
      const newTask = await prisma.tasks.create({
        data: {
          id,
          name,
          title,
          status,
          label,
          priority,
        },
      });

      return newTask;
    },
    updateTask: async (
      _: any,
      { id, label }: { id: string; label: string },
    ) => {
      const updatedTask = await prisma.tasks.update({
        where: { id },
        data: { label },
      });

      return updatedTask;
    },
    deleteTask: async (_: any, { id }: { id: string }) => {
      const deletedTask = await prisma.tasks.delete({ where: { id } });

      return deletedTask;
    },
  },
};

export default resolvers;
