import "dotenv/config";
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from "../generated/prisma/client";

const connectionString = `${process.env.DATABASE_URL}`

const adapter = new PrismaPg({ 
    connectionString,
    max : 10,
    connectionTimeoutMillis : 10000,
    idleTimeoutMillis : 30000
})
const prisma = new PrismaClient({ 
    adapter,
    transactionOptions : {
        maxWait : 10000,
        timeout : 10000
    }
})

export { prisma }