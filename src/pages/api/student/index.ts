import { prisma } from "@/lib/client";
import { withCORS } from "@/lib/api/withCORS";

export default withCORS(async (req, res) => {
  try {
    const { query } = req;
    const data = await prisma.student.findMany({});

    return res.status(200).json({ data, params: query });
  } catch (error) {
    // res.status(500).json({ error });
  }
});

