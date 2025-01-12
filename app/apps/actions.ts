'use server'

import { MyApp } from "@prisma/client";
import myAppService from "@/db/myapps.service";


export async function getApps(): Promise<MyApp[]> {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    return myAppService.getMyApps();
}

