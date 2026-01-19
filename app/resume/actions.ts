"use server";

import userService from "@/db/user.service";

export async function getResumeData() {
  try {
    const resume = await userService.getResume();
    return resume;
  } catch (error) {
    console.error("Error fetching resume data:", error);
    return null;
  }
}
