import { NextApiResponse, NextApiRequest } from "next";
import { prisma } from "prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const contacts = await prisma.administrator.findMany({
    select: {
      fullName: true,
      phoneNumber: true
    }
  });
  res.status(200).json({ result: contacts });
}
