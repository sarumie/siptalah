// Cors
import NextCors from "nextjs-cors";

// Next
import { NextApiRequest, NextApiResponse } from "next";

const cors = async (req: NextApiRequest, res: NextApiResponse) =>
  NextCors(req, res, {
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "https://gure-san.github.io"
  });

export { cors };
