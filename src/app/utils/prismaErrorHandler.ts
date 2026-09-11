/* eslint-disable no-useless-assignment */
import { Prisma } from "../../generated/prisma/client";

export const handlePrismaError = (err: Prisma.PrismaClientKnownRequestError) => {
    let statusCode = 500;
    let message = "Database operation failed.";

    switch (err.code) {
        case "P2002": {
            statusCode = 409;

            const target = err.meta?.target;

            if (Array.isArray(target)) {
                if (target.includes("cart_id") && target.includes("meal_id")) {
                    message = "Duplicate item can't be added to the cart.";
                } else if (target.includes("email")) {
                    message = "An account with this email already exists.";
                } else {
                    message = "A record with these values already exists.";
                }
            } else {
                message = "A record with these values already exists.";
            }

            break;
        }

        case "P2003": {
            statusCode = 409;
            message = "This record cannot be deleted because it is being used by another record.";
            break;
        }

        case "P2025": {
            statusCode = 404;
            message = "The requested record was not found.";
            break;
        }

        default: {
            statusCode = 500;
            message = "A database error occurred.";
        }
    }

    return {
        statusCode,
        message
    };
};