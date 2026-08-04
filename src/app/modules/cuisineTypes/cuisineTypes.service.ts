import { prisma } from "../../../lib/prisma"

export const CuisineTypeService = {

    async getCuisineTypes() {
        const chuiineTypes = await prisma.cuisinetype.findMany()
        return chuiineTypes
    },

    async getCuisineTypeById(id:string) {
        const cuisineType = await prisma.cuisinetype.findUnique({
            where: { id },
        })
        return cuisineType
    },

    async addCuisineType(name: { cuisine_type_name: string }) {
        const newCuisineType = await prisma.cuisinetype.create({
            data: name
        })
        return newCuisineType
    },

    async updateCuisineType(id: string, name: string) {
        console.log(name);

        const updatedCuisineType = await prisma.cuisinetype.update({
            where: { id },
            data : name
        })
        return updatedCuisineType
    },

    async deleteCuisineType(id: string) {
        const deletedCuisineType = await prisma.cuisinetype.delete({
            where: { id },
        })
        return deletedCuisineType
    },


}