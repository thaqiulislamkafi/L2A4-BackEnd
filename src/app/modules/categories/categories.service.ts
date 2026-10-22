import { prisma } from "../../../lib/prisma"
import { CreateCategoryDto, UpdateCategoryDto } from "./categories.dto";
import { CategoriesMapper } from "./categories.mapper";

export const CategoriesService = {

    async getAllCategories() {

        const categories = await prisma.categories.findMany();
        return CategoriesMapper.toList(categories);

    },

    async getCategoryById(id: string) {

        const category = await prisma.categories.findUnique({
            where: { id }
        })

        if (!category)
            throw new Error("Category not found");

        return CategoriesMapper.toResponse(category);
    },

    async addCategory(data: CreateCategoryDto) {

        const existCategory = await prisma.categories.findFirst({
            where: {
                category_name: data.category_name
            }
        })

        if (existCategory)
            throw new Error(`${data.category_name} is already added`);

        const category = await prisma.categories.create({
            data: data
        })
        return CategoriesMapper.toCreateResponse(category)
    },

    async updateCategory(id: string, data: UpdateCategoryDto) {

        const isCategoryExist = await this.getCategoryById(id)

        const category = await prisma.categories.update({
            where: { 
                id : isCategoryExist?.id
            },
            data: data
        })
        
        return CategoriesMapper.toUpdateResponse(category);

    },

    async deleteCategory(id: string) {

        const isCategoryExist = await this.getCategoryById(id)

        const category = await prisma.categories.delete({
            where: { 
                id : isCategoryExist?.id
            }
        })
        return CategoriesMapper.toDeleteResponse(category)
    }

}