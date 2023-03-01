// Next
import { NextApiResponse, NextApiRequest } from "next";

// Prisma
import { prisma } from "prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const contacts = await prisma.administrator.findMany({
      select: {
        fullName: true,
        phoneNumber: true
      }
    });
    res.status(200).json({ result: contacts });
  } catch (error) {
    res.status(500).json({ result: "Ada yang salah, silahkan coba lagi 😥" });
  }
}
