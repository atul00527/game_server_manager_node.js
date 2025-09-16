import { PrismaClient } from '../generated/prisma/index.js';

const prisma = new PrismaClient();

const DB_ERROR_CODES = {
    UNIQUE_ERR: 'P2002'
}

export { prisma, DB_ERROR_CODES }
