
import { User } from "../../../generated/prisma/client";

export const AuthMapper = {
    toResponse(user: User) {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            emailVerified: user.emailVerified,
            image: user.image,
            role: user.role,
            status: user.status,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
    },

    toList(users: User[]) {
        return users.map((user) => this.toResponse(user));
    },

    toPaginatedResponse(
        users: User[],
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPage: number;
        },
    ) {
        return {
            data: this.toList(users),
            meta,
        };
    },

    toSignUpResponse(user: User) {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            emailVerified: user.emailVerified,
            image: user.image
        };
    },

    toSignInResponse(user: User) {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            emailVerified: user.emailVerified,
            image: user.image,
            role: user.role,
            status: user.status,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
    },

    toUpdateResponse(user: User) {
        return this.toResponse(user);
    },

    toAdminResponse(user: User) {
        return {
            ...this.toResponse(user),
            banned: user.banned,
            banReason: user.banReason,
            banExpires: user.banExpires,
        };
    },

    toDeleteResponse(user: User) {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        };
    },

    toDeleteManyResponse(result: { count: number }) {
        return {
            count: result.count,
        };
    },
};
