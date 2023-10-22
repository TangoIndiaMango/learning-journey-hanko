import { PrismaClient } from "@prisma/client"
import "server-only"


//prepare the prisma client
// so in development we have hot reload and anytime its
// reloading it'll try to create new instance so to prvent that
// we check if there is a cached instance if not we initiate a new one

declare global {
    var cachedParams: PrismaClient;
}

export let prisma: PrismaClient;
if (process.env.NODE_ENV === "production") {
    prisma = new PrismaClient();
} else {
    if (!global.cachedParams) {
        global.cachedParams = new PrismaClient();
    };
    prisma = global.cachedParams
}