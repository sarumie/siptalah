import { default as axiosLib } from "axios";
import { baseUrl } from "@/lib/utils";
import { createClient } from "@supabase/supabase-js";
import { QueryClient } from "@tanstack/react-query";
import { PrismaClient } from "@prisma/client";

/**
 * Prisma client
 */
const globalForPrisma = global as unknown as { prisma: PrismaClient };
export const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

/**
 * react-query client
 */
export const queryClient = new QueryClient();

/**
 * supabase client
 */
export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

/**
 * axios client
 */
export const axios = axiosLib.create({
  baseURL: `${baseUrl}/api`,
  timeout: 10000
});

