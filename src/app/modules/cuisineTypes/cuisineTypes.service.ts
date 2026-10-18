import { prisma } from "../../../lib/prisma"
import { CuisineTypeMapper } from "./cuisinetype.mapper";

export const CuisineTypeService = {

    async getCuisineTypes() {

        const cuisineTypes = await prisma.cuisinetype.findMany()
        return CuisineTypeMapper.toList(cuisineTypes);

    },

    async getCuisineTypeById(id:string) {

        const cuisineType = await prisma.cuisinetype.findUnique({
            where: { id },
        })
        return CuisineTypeMapper.toResponse(cuisineType)

    },

    async addCuisineType(name: { cuisine_type_name: string }) {

        const newCuisineType = await prisma.cuisinetype.create({
            data: name
        })
        return CuisineTypeMapper.toCreateResponse(newCuisineType)

    },

    async updateCuisineType(id: string, name: string) {

        const updatedCuisineType = await prisma.cuisinetype.update({
            where: { id },
            data : name
        })
        return CuisineTypeMapper.toUpdateResponse(updatedCuisineType)

    },

    async deleteCuisineType(id: string) {

        const deletedCuisineType = await prisma.cuisinetype.delete({
            where: { id },
        })
        return CuisineTypeMapper.toDeleteResponse(deletedCuisineType)

    },
}