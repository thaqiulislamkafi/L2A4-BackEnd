/* eslint-disable @typescript-eslint/no-explicit-any */


type Tquery = Record<string, unknown>
type AdvancedSearchField = {
    field: string;
    relation?: string;
};

type AdvancedFilter = {
    field: string;
    relation: string;
};
export class QueryBuilder {

    private query: Tquery;
    private prismaQuery: any;

    constructor(query: Tquery) {

        this.query = query || {};
        this.prismaQuery = {
            where: {}
        };
    }

    search(fields: string[]) {

        if (this.query.search) {
            const searchTerm = this.query.search as string;

            this.prismaQuery.where = {
                OR: fields.map(field => ({
                    [field]: {
                        contains: searchTerm,
                        mode: 'insensitive'
                    }
                }))
            }
        }

        return this
    }

    advancedSearch(fields: AdvancedSearchField[]) {
        if (!this.query.search) {
            return this;
        }

        const searchTerm = String(this.query.search);

        const conditions = fields.map(({ field, relation }) => {

            if (!relation) {
                return {
                    [field]: {
                        contains: searchTerm,
                        mode: "insensitive"
                    }
                };
            }

            return {
                [relation]: {
                    [field]: {
                        contains: searchTerm,
                        mode: "insensitive"
                    }
                }
            };
        });

        this.prismaQuery.where = {
            ...this.prismaQuery.where,
            OR: conditions
        };

        return this;
    }

    advancedFilter(filters: AdvancedFilter[]) {
        filters.forEach(({ field, relation }) => {
            const rawValue = this.query[field];

            if (rawValue === undefined || rawValue === null) {
                return;
            }

            const value = String(rawValue).replace(/^["']|["']$/g, "").trim();

            if (!value || value.toUpperCase() === "ALL") {
                return;
            }

            this.prismaQuery.where[relation] = {
                [field]: value
            };
        });

        return this;
    }


    sort() {
        if (this.query.sort) {

            const sortField = this.query.sort as string;
            const sortOrder = this.query.order === 'desc' ? 'desc' : 'asc';

            this.prismaQuery.orderBy = {
                [sortField]: sortOrder
            }
        }

        return this;
    }

    filter(customExcludeFields: string[] = []) {

        const defaultExcludeFields = ["search", "sort", "oreder", "page", "limit"];
        const excludeFields = [...defaultExcludeFields, ...customExcludeFields];

        const filters = { ...this.query };
        excludeFields.forEach((field) => delete filters[field]);

        Object.entries(filters).forEach(([key, value]) => {

            if (value === undefined || value === null || value === "") return;

            if (value === "true" || value === "false") {
                this.prismaQuery.where[key] = value === "true";
            }

            else if (
                typeof value === "string" &&
                !isNaN(Number(value))
            ) {
                this.prismaQuery.where[key] = Number(value);
            }

            else if (
                typeof value === "string" &&
                value.includes(",")
            ) {
                this.prismaQuery.where[key] = {
                    in: value.split(",")
                };
            }

            else {
                this.prismaQuery.where[key] = value;
            }
        });

        return this;

    }

    paginate() {
        const page = parseInt(this.query.page as string) || 1;
        const limit = parseInt(this.query.limit as string) || 10;
        const skip = (page - 1) * limit;
        this.prismaQuery.skip = skip;
        this.prismaQuery.take = limit;
        return this;
    }

    build() {
        return this.prismaQuery;
    }
}