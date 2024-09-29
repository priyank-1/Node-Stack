import { PrismaClient } from "@prisma/client";

const db = new PrismaClient({
    log : ['query','info','warn','error']
});

export default db;

export const genid = async () => {
    const { nanoid } = await import('nanoid');
    return nanoid(16);
  };
