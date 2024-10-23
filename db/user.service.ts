import prisma from "@/lib/prisma";


class UserService {
    async fetchAdmin() {
        return prisma.user.findFirst({
            where: {
                role: 'admin'
            }
        });
    }
}

const userService = new UserService();

export default userService;