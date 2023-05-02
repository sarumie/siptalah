import { NextApiResponse, NextApiRequest } from "next";
import { baseUrl } from "@/lib/utils";
import supabase from "@/lib/supabase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email } = req.body as { [key: string]: string };

  const auth = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${baseUrl}/d/presensi`
    }
  });

  if (auth.error) return res.status(401).send({ message: auth.error.message });

  res.status(200).json({ message: "Silahkan cek email anda" });

  // if (Array.isArray(nip))
  //   return res.status(400).json({ message: "Invalid parameter" });

  // try {
  //   const user = await prisma.administrator.findUnique({
  //     where: { nip },
  //     select: {
  //       fullName: true,
  //       access: true,
  //       level: true
  //     }
  //   });

  //   res.status(200).json({ result: user });
  // } catch (e) {
  //   if (e instanceof PrismaClientKnownRequestError)
  //     res.status(500).json(e.message);
  // }
}

