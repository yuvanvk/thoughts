import { PrismaClient } from "./generated/client";

const globalPrisma = global as unknown as {
    prisma: PrismaClient;
}

const prisma = globalPrisma.prisma || new PrismaClient();

if(process.env.NODE_ENV === "production") globalPrisma.prisma = new PrismaClient();

export default prisma;
