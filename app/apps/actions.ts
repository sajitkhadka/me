'use server'

import { MyApp } from "@prisma/client";
import myAppService from "@/db/myapps.service";


export async function getApps(): Promise<MyApp[]> {
    return myAppService.getMyApps();
}

