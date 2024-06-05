import { Prisma } from '@prisma/client';
import prisma from '@/lib/db';
import { Sort, Order, Task, Filter } from './__generated__/types';

const resolvers = {
  Query: {
    tasks: async (
      _: any,
      {
        limit = 10,
        offset = 0,
        sort = Sort.CreatedAt,
        order = Order.Desc,
        filter = {},
      },
    ) => {
      const { keyword }: Filter = filter;
      const where: Prisma.tasksWhereInput = {};

      if (keyword) {
        const keywords = keyword
          .split(/[\s,]+/)
          .map((k) => k.trim())
          .filter((k) => k);

        where.AND = keywords.map((k) => ({
          OR: [{ title: { contains: k, mode: 'insensitive' } }],
        }));
      }

      const [items, totalCount] = await Promise.all([
        prisma.tasks.findMany({
          take: limit,
          skip: offset,
          orderBy: { [sort]: order },
          where,
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
