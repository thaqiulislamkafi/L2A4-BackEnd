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

        if(!cuisineType)
            throw new Error("This Cuisine Type is not found");

        return CuisineTypeMapper.toResponse(cuisineType)

    },

    async addCuisineType(data: CreateCuisineTypeDto) {

        const isCuisineTypeExist = await prisma.cuisinetype.findFirst({
            where : {
                cuisine_type_name : data.cuisine_type_name
            }
        })

        if(isCuisineTypeExist)
            throw new Error(`${data.cuisine_type_name} is already added`);

        const newCuisineType = await prisma.cuisinetype.create({
            data: data
        })
        return CuisineTypeMapper.toCreateResponse(newCuisineType)

    },

    async updateCuisineType(id: string, data: UpdateCuisineTypeDto) {

        const isCuisineTypeExist = await this.getCuisineTypeById(id);

        const updatedCuisineType = await prisma.cuisinetype.update({
            where: { 
                id : isCuisineTypeExist?.id
            },
            data : data
        })

        return CuisineTypeMapper.toUpdateResponse(updatedCuisineType);

    },

    async deleteCuisineType(id: string) {

        const isCuisineTypeExist = await this.getCuisineTypeById(id);


        const deletedCuisineType = await prisma.cuisinetype.delete({
            where: { 
                id : isCuisineTypeExist?.id
            },
        })
        return CuisineTypeMapper.toDeleteResponse(deletedCuisineType)

    },
}