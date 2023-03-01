import { NextApiResponse, NextApiRequest } from "next";
import { prisma } from "prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { params } = req.query;
    const user = await prisma.administrator.findUnique({
      where: {
        nip: params![1]
      },
      select: {
        fullName: true,
        access: true,
        level: true
      }
    });
    res.status(200).json({ data: user });
  } catch (error) {
    console.log("asw");
    res.status(500).json({ data: "Ada yang salah, silahkan coba lagi 😥" });
  }
}
