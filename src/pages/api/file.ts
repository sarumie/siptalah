import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  { body }: NextApiRequest,
  res: NextApiResponse
) {
  // const workbook = read((body as File).arrayBuffer());
  // console.log(workbook);

  res.status(200).json(body);
}
