// Prisma
import { prisma } from "prisma/client";

// Next
import type { NextApiRequest, NextApiResponse } from "next";

// Cors
import { cors } from "@/lib/api/cors";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // actived cors
    await cors(req, res);

    // process data
    const { query } = req;
    const data = await prisma.student.findMany({
      include: {
        profile: {
          select: {
            fullName: true,
            email: true,
            password: true
          }
        }
      }
    });

    console.log(query);

    // send response
    res.status(200).json({ data, params: query });
  } catch (error) {
    res.status(500).json({ error });
  }
}
