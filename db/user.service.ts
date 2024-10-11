import prisma from "@/lib/prisma";


class UserService {
    async fetchUser() {
        return prisma.user.findFirst();
    }
}

const userService = new UserService();

export default userService;