/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { auth } from "../../../lib/auth";
import { fromNodeHeaders } from "better-auth/node";
import { AuthRequest } from "../../types/AuthRequest.type";
import { prisma } from "../../../lib/prisma";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { DashboardStatsService } from "../dashboardStats/dashboardStats.service";
import { getMonthAndDate } from "../../utils/getMonthAndDate";
import { CartService } from "../cart/cart.service";
import { User } from "../../../generated/prisma/client";

export const AuthService = {

    async getAllUsers(query: Record<string, unknown>) {

        const qb = new QueryBuilder(query)
            .search(['email', 'name'])
            .sort()
            .paginate()

        const prismaQuery = qb.build();

        const page = Number(query.page) || 1;
        const limit = Number(query.limit) || 10;

        const [result, total] = await Promise.all([

            prisma.user.findMany({
                ...prismaQuery,
            }),
            prisma.user.count({
                where: prismaQuery.where
            })
        ]);

        return {
            data: result,
            meta: {
                page,
                limit,
                total,
                totalPage: Math.ceil(total / limit)
            }
        }
    },

    async getUserById(id: string) {

        const result = await prisma.user.findUnique({
            where: { id }
        });
        return result;
    },

    async SignUp(data: any, req: AuthRequest) {

        const result = await auth.api.signUpEmail({
            body: data,
            headers: fromNodeHeaders(req.headers),
            returnHeaders: true,
        });

        const date = await getMonthAndDate(String(result.response.user.createdAt));

        return await prisma.$transaction(async (tx) => {

            if (result.response.user.role === 'user') {
                await DashboardStatsService.incrementUsersJoined(date.year, date.month, tx);
                await CartService.addCart(result.response.user.id, tx);
            }
            else if (result.response.user.role === 'provider') {
                await DashboardStatsService.incrementProvidersJoined(date.year, date.month, tx);
            }

            return result;
        })
    },

    async SignIn(data: any, req: AuthRequest) {

        const result = await auth.api.signInEmail({
            body: data,
            headers: fromNodeHeaders(req.headers),
            returnHeaders: true,
        });

        return result;
    },

    async SignOut(req: AuthRequest) {

        const result = await auth.api.signOut({
            headers: fromNodeHeaders(req.headers),
            returnHeaders: true,
        });

        return result;
    },

    async GetMe(req: AuthRequest) {

        const session = await auth.api.getSession({
            headers: fromNodeHeaders(req.headers)
        })

        if (!session) throw new Error('Not Authenticated');

        return session
    },

    async changePassword(data: { password: string; newPassword: string }, req: AuthRequest) {

        const result = await auth.api.changePassword({
            body: {
                newPassword: data.newPassword,
                currentPassword: data.password,
                revokeOtherSessions: true,
            },
            headers: fromNodeHeaders(req.headers)
        });
        return result;
    },

    async RequestPasswordReset(email: string) {

        const result = await auth.api.requestPasswordReset({
            body: { email }
        });
        return result;
    },

    async ResetPassword(data: any) {

        const result = await auth.api.resetPassword({
            body: data
        });
        return result;
    },

    async forgotPasswordByOTP(email: string) {

        const result = await auth.api.requestPasswordResetEmailOTP({
            body: { email }
        })

        return result;
    },

    async verifyOtpForForgetPassword(email: string, otp: string) {

        const result = await auth.api.checkVerificationOTP({
            body: {
                email,
                type: 'forget-password',
                otp
            }
        })

        return result;
    },

    async resetPasswordByOTP(email: string, otp: string, newPassword: string) {

        const result = await auth.api.resetPasswordEmailOTP({
            body: {
                email,
                otp,
                password: newPassword
            }
        });

        return result
    },

    async sendOtpForEmailVerification(email: string) {

        const result = await auth.api.sendVerificationOTP({
            body: {
                email,
                type: "email-verification",
            },
        });

        return result;
    },

    async verifyOtpForEmailVerification(email: string, otp: string) {

        const result = await auth.api.verifyEmailOTP({
            body: {
                email,
                otp,
            },
        });

        return result;
    },

     async requestEmailChangeOTP(newEmail: string, req: AuthRequest) {

        const result = await auth.api.requestEmailChangeEmailOTP({
            body: {
                newEmail,
            },
            headers: fromNodeHeaders(req.headers)
        });

        return result;
    },

    async ChangeEmailByOTP(newEmail: string, otp: string, req: AuthRequest) {

        const result = await auth.api.changeEmailEmailOTP({
            body: {
                newEmail,
                otp
            },
            headers: fromNodeHeaders(req.headers)
        });

        return result;
    },

    async logOutAllSessions(req: AuthRequest) {

        const result = await auth.api.revokeOtherSessions({
            headers: fromNodeHeaders(req.headers),
        });

        return result;
    },

    async updateUser(userId: string, data: Partial<User>) {

        const result = await prisma.user.update({
            where: {
                id: userId
            },
            data: data
        });
        return result;
    },

    async deleteUser(userId: string) {

        return await prisma.$transaction(async (tx) => {

            const result = await tx.user.delete({
                where: {
                    id: userId
                }
            });

            const date = await getMonthAndDate(String(result.createdAt));
            await DashboardStatsService.decrementUsersJoined(date.year, date.month, tx);

            return result;
        })
    },

    async deleteAllUsers() {

        const result = await prisma.user.deleteMany();
        return result;

    }
}