import { prisma } from "../../../lib/prisma"
import { CreateCategoryDto, UpdateCategoryDto } from "./categories.dto";
import { CategoriesMapper } from "./categories.mapper";

export const CategoriesService =  {

    async  getAllCategories() {

        const categories = await prisma.categories.findMany();
        return CategoriesMapper.toList(categories);

    },

    async getCategoryById(id:string){

        const category = await prisma.categories.findUnique({
            where: { id }
        })
        return CategoriesMapper.toResponse(category) ;
    },
    
    async addCategory(data:CreateCategoryDto){

        const category = await prisma.categories.create({
            data : data
        })
        return CategoriesMapper.toCreateResponse(category)
    },

    async updateCategory(id:string,data:UpdateCategoryDto){

        const category = await prisma.categories.update({
            where: { id },
            data : data
        })
        return CategoriesMapper.toUpdateResponse(category)
    },

    async deleteCategory(id:string){

        const category = await prisma.categories.delete({
            where: { id }
        })
        return CategoriesMapper.toDeleteResponse(category)
    }

}