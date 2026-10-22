import { prisma } from "../../../lib/prisma"
import { CreateDietryTypeDto, UpdateDietryTypeDto } from "./dietryType.dto";
import { DietryTypesMapper } from "./dietryType.mapper";

export const DietryTypesService = {

    async getDietryTypes() {

        const dietryTypes = await prisma.dietrytype.findMany();
        return DietryTypesMapper.toList(dietryTypes);

    },

    async getDietryTypeById(id: string) {

        const dietryType = await prisma.dietrytype.findUnique({
            where: { id },
        });

        if(!dietryType)
            throw new Error("This dietry type is not found");

        return DietryTypesMapper.toResponse(dietryType)

    },

    async addDietryType(data: CreateDietryTypeDto) {

        const isDietryTypeExist = await prisma.dietrytype.findFirst({
            where : {
                dietry_type_name : data.dietry_type_name
            }
        })

        if(isDietryTypeExist)
            throw new Error(`${data.dietry_type_name} is already added`);

        const newDietryType = await prisma.dietrytype.create({
            data: data
        });
        return DietryTypesMapper.toCreateResponse(newDietryType);

    },

    async updateDietryType(id: string, data:UpdateDietryTypeDto) {

        const isDietryTypeExist = await this.getDietryTypeById(id) ;

        const updatedDietryType = await prisma.dietrytype.update({
            where: { 
                id : isDietryTypeExist?.id
             },
            data: data
        });
        return DietryTypesMapper.toUpdateResponse(updatedDietryType);

    },

    async deleteDietryType(id: string) {

        const isDietryTypeExist = await this.getDietryTypeById(id) ;

        const deletedDietryType = await prisma.dietrytype.delete({
            where: { 
                id :  isDietryTypeExist?.id
             },
        });
        return DietryTypesMapper.toDeleteResponse(deletedDietryType);

    },
}