import { NextApiResponse, NextApiRequest } from "next";
import { prisma } from "prisma/client";
import cookie from "cookie";

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    fullName: string;
    nip: string;
  };
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  try {
    const { nip, fullName } = req.body;

    if (!nip || Array.isArray(nip))
      return res.status(400).json({ error: true, message: "Invalid Request" });

    const user = await prisma.administrator.findUnique({
      where: {
        nip
      },
      select: {
        access: true
      }
    });

    res.status(200).json({ data: user });
  } catch (error) {
    res
      .status(500)
      .setHeader(
        "Set-Cookie",
        cookie.serialize("is_logged_in", "1", {
          // expires: Date.
        })
      )
      .json({ data: "Ada yang salah, silahkan coba lagi 😥", error });
  }
}
