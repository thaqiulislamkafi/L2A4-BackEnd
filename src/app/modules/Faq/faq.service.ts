import { prisma } from "../../../lib/prisma";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { CreateFaqDto, UpdateFaqDto } from "./faq.dto";
import { FAQMapper } from "./faq.mapper";

export const FAQService = {

  async getAllFAQs(query: Record<string, unknown>) {
    const qb = new QueryBuilder(query)
      .search(["question"])
      .sort()
      .paginate();

    const prismaQuery = qb.build();

    const page = Number(query.page) || 1;
    const limit = Math.min(Number(query.limit) || 6, 10);

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
      data: FAQMapper.toList(result),
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
    const limit = Math.min(Number(query.limit) || 6, 10);


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
      data: FAQMapper.toList(result),
      meta: {
        page,
        limit,
        total,
        totalPage: Math.ceil(total / limit),
      },
    };
  },

  async getFAQById(id: string) {

    const result = await prisma.fAQ.findUnique({
      where: { id },
    });
    return FAQMapper.toResponse(result);

  },

  async createFAQ(data: CreateFaqDto) {

    const result = await prisma.fAQ.create({
      data,
    });
    return FAQMapper.toCreateResponse(result);

  },

  async updateFAQ(id: string, data: UpdateFaqDto) {

    const result = await prisma.fAQ.update({
      where: { id },
      data,
    });
    return FAQMapper.toUpdateResponse(result);

  },

  async deleteFAQ(id: string) {

    const result = await prisma.fAQ.delete({
      where: { id },
    });
    return FAQMapper.toDeleteResponse(result)

  },

  async togglePublishStatus(id: string) {

    const faq = await prisma.fAQ.findUnique({
      where: { id },
    });

    if (!faq) {
      throw new Error("FAQ not found");
    }

    const result = await prisma.fAQ.update({
      where: {
        id,
      },
      data: {
        isPublished: !faq.isPublished,
      },
    });

    return FAQMapper.toPublishStatusResponse(result);
  },
};