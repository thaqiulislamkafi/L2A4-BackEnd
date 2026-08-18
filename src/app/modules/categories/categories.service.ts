import { Categories } from "../../../generated/prisma/client";
import { prisma } from "../../../lib/prisma"

export const CategoriesService =  {

    async  getAllCategories() {

        const categories = await prisma.categories.findMany();
        return categories;
    },

    async getCategoryById(id:string){

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

    async updateCategory(id:string,data:Partial<Categories>){

        const category = await prisma.categories.update({
            where: { id },
            data : data
        })
        return category
    },

    async deleteCategory(id:string){

        const category = await prisma.categories.delete({
            where: { id }
        })
        return category
    }

}