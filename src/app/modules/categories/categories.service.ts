import { Categories } from "../../../generated/prisma/client";
import { prisma } from "../../../lib/prisma"
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
    
    async addCategory(data:Categories){

        const category = await prisma.categories.create({
            data : data
        })
        return CategoriesMapper.toCreateResponse(category)
    },

    async updateCategory(id:string,data:Partial<Categories>){

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