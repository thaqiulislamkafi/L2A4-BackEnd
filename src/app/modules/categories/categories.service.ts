import { Categories } from "../../../generated/prisma/client";
import { prisma } from "../../../lib/prisma"

export const CategoriesService =  {

    async  getAllCategories() {

        const categories = await prisma.categories.findMany();
        return categories;
    },

    async getCategoryById(id:number){

        const category = await prisma.categories.findUnique({
            where: { id }
        })
        return category ;
    },
    
    async addCategory(data:Categories){

        const category = await prisma.categories.create({
            data : data
        })
        return category
    },

    async updateCategory(id:number,data:Partial<Categories>){

        const category = await prisma.categories.update({
            where: { id },
            data : data
        })
        return category
    },

    async deleteCategory(id:number){

        const category = await prisma.categories.delete({
            where: { id }
        })
        return category
    }

}