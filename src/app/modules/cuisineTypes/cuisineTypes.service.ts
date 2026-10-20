import { prisma } from "../../../lib/prisma"
import { CreateCuisineTypeDto, UpdateCuisineTypeDto } from "./cuisineType.Dto";
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

    async addCuisineType(data: CreateCuisineTypeDto) {

        const newCuisineType = await prisma.cuisinetype.create({
            data: data
        })
        return CuisineTypeMapper.toCreateResponse(newCuisineType)

    },

    async updateCuisineType(id: string, data: UpdateCuisineTypeDto) {

        const updatedCuisineType = await prisma.cuisinetype.update({
            where: { id },
            data : data
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