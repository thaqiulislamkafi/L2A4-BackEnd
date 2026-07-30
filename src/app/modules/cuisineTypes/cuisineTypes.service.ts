import { prisma } from "../../../lib/prisma"

export const CuisineTypeService = {

    async getCuisineTypes() {
        const chuiineTypes = await prisma.cuisinetype.findMany()
        return chuiineTypes
    },

    async getCuisineTypeById(id: number) {
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

    async updateCuisineType(id: number, name: string) {
        console.log(name);

        const updatedCuisineType = await prisma.cuisinetype.update({
            where: { id },
            data : name
        })
        return updatedCuisineType
    },

    async deleteCuisineType(id: number) {
        const deletedCuisineType = await prisma.cuisinetype.delete({
            where: { id },
        })
        return deletedCuisineType
    },


}