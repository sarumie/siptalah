import NextCors from "nextjs-cors";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

export const withCORS =
  (handler: NextApiHandler) =>
  async (req: NextApiRequest, res: NextApiResponse) =>
    NextCors(req, res, {
      methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
      origin: "https://gure-san.github.io"
    });

