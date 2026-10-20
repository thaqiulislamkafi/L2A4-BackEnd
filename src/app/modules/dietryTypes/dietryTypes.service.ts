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
        return DietryTypesMapper.toResponse(dietryType)

    },

    async addDietryType(data: CreateDietryTypeDto) {

        const newDietryType = await prisma.dietrytype.create({
            data: data
        });
        return DietryTypesMapper.toCreateResponse(newDietryType);

    },

    async updateDietryType(id: string, data:UpdateDietryTypeDto) {

        const updatedDietryType = await prisma.dietrytype.update({
            where: { id },
            data: data
        });
        return DietryTypesMapper.toUpdateResponse(updatedDietryType);

    },

    async deleteDietryType(id: string) {

        const deletedDietryType = await prisma.dietrytype.delete({
            where: { id },
        });
        return DietryTypesMapper.toDeleteResponse(deletedDietryType);

    },
}