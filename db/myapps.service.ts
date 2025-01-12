import prisma from "@/lib/prisma";

class MyAppService {

    async getMyApps() {
        return await prisma.myApp.findMany({
            orderBy: {
                sortOrder: 'desc',
                // createdAt: 'asc',
            }
        });
    }
}

const myAppService = new MyAppService();
export default myAppService;