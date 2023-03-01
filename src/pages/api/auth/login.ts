import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { NextApiResponse, NextApiRequest } from "next";
import { prisma } from "prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { nip } = req.body;

  if (Array.isArray(nip))
    return res.status(400).json({ message: "Invalid parameter" });

  try {
    const user = await prisma.administrator.findUnique({
      where: { nip },
      select: {
        fullName: true,
        access: true,
        level: true
      }
    });

    res.status(200).json({ result: user });
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError)
      res.status(500).json(e.message);
  }
}
