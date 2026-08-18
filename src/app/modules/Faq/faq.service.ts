import { FAQ } from "../../../generated/prisma/client";
import { prisma } from "../../../lib/prisma";
import { QueryBuilder } from "../../utils/QueryBuilder";

export const FAQService = {
  async getAllFAQs(query: Record<string, unknown>) {
    const qb = new QueryBuilder(query)
      .search(["question"])
      .sort()
      .paginate();

    const prismaQuery = qb.build();

    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;

    const [result, total] = await Promise.all([
      prisma.fAQ.findMany({
        ...prismaQuery,
        orderBy: prismaQuery.orderBy || {
          sortOrder: "asc",
        },
      }),

      prisma.fAQ.count({
        where: prismaQuery.where,
      }),
    ]);

    return {
      data: result,
      meta: {
        page,
        limit,
        total,
        totalPage: Math.ceil(total / limit),
      },
    };
  },

  async getPublishedFAQs(query: Record<string, unknown>) {
    const qb = new QueryBuilder(query)
      .search(["question"])
      .sort()
      .paginate();

    const prismaQuery = qb.build();

    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;

    const [result, total] = await Promise.all([
      prisma.fAQ.findMany({
        ...prismaQuery,
        where: {
          ...prismaQuery.where,
          isPublished: true,
        },
        orderBy: prismaQuery.orderBy || {
          sortOrder: "asc",
        },
      }),

      prisma.fAQ.count({
        where: {
          ...prismaQuery.where,
          isPublished: true,
        },
      }),
    ]);

    return {
      data: result,
      meta: {
        page,
        limit,
        total,
        totalPage: Math.ceil(total / limit),
      },
    };
  },

  async getFAQById(id: string) {
    return prisma.fAQ.findUnique({
      where: { id },
    });
  },

  async createFAQ(data: Omit<FAQ, "id" | "generatedAt" | "updatedAt">) {
    return prisma.fAQ.create({
      data,
    });
  },

  async updateFAQ(id: string, data: Partial<FAQ>) {
    return prisma.fAQ.update({
      where: { id },
      data,
    });
  },

  async deleteFAQ(id: string) {
    return prisma.fAQ.delete({
      where: { id },
    });
  },

  async togglePublishStatus(id: string) {
    const faq = await prisma.fAQ.findUnique({
      where: { id  },
    });

    if (!faq) {
      throw new Error("FAQ not found");
    }

    return prisma.fAQ.update({
      where: {
        id,
      },
      data: {
        isPublished: !faq.isPublished,
      },
    });
  },
};