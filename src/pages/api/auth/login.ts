import { NextApiResponse, NextApiRequest } from "next";
import { baseUrl } from "@/lib/utils";
import { supabase } from "@/lib/client";

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
}

