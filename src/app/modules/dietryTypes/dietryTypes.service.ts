import { prisma } from "../../../lib/prisma"

export const DietryTypesService = {

    async getDietryTypes() {
        const dietryTypes = await prisma.dietrytype.findMany();
        return dietryTypes;
    },

    async getDietryTypeById(id: string) {
        const dietryType = await prisma.dietrytype.findUnique({
            where: { id },
        });
        return dietryType;
    },

    async addDietryType(name: { dietry_type_name: string }) {
        const newDietryType = await prisma.dietrytype.create({
            data: name
        });
        return newDietryType;
    },

    async updateDietryType(id: string, name: string) {
        const updatedDietryType = await prisma.dietrytype.update({
            where: { id },
            data: name
        });
        return updatedDietryType;
    },

    async deleteDietryType(id: string) {
        const deletedDietryType = await prisma.dietrytype.delete({
            where: { id },
        });
        return deletedDietryType;
    },
}