import prisma from "@/lib/prisma";

class UserService {
  async fetchAdmin() {
    return prisma.user.findFirst({
      where: {
        role: "admin",
      },
    });
  }

  async getResume(userId?: string) {
    const user = userId
      ? await prisma.user.findUnique({ where: { id: userId } })
      : await this.fetchAdmin();

    if (!user?.resume) {
      return null;
    }

    try {
      return JSON.parse(user.resume);
    } catch {
      return null;
    }
  }

  async updateResume(userId: string, resumeData: any) {
    return prisma.user.update({
      where: { id: userId },
      data: { resume: JSON.stringify(resumeData) },
    });
  }
}

const userService = new UserService();

export default userService;
