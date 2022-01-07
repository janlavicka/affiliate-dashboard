import { NextApiRequest, NextApiResponse } from "next";
import withJoi from "next-joi";

export default withJoi({
  onValidationError: (req: NextApiRequest, res: NextApiResponse) => {
    res.status(400).end();
  },
});
