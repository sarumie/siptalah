import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextApiResponse, NextApiRequest } from "next";
import { prisma } from "@/lib/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  /**
   * Sementara hanya mereturn 5 admin pertama
   */
  const contacts = await prisma.admin
    .findMany({
      select: {
        fullName: true,
        phoneNumber: true
      },
      take: 5
    })
    .catch((e) => {
      if (e instanceof PrismaClientKnownRequestError)
        return { message: e.message };
    });

  res.status(200).json({ result: contacts });
}

