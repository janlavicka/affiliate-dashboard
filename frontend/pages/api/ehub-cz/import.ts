import EhubCzApi from "@/lib/api/ehub-cz";
import { prisma } from "@/lib/prisma";
import { supabase } from "@/lib/supabase";
import EhubCzTask from "@/lib/tasks/ehub-cz";
import { EhubCzCreditials } from "@/types";
import type { NextApiRequest, NextApiResponse } from "next";
import validation from "@/lib/middlewares/validation";
import connect from "next-connect";
import Joi from "joi";

type Data = {
  message: string;
};

export default connect().post(
  validation({
    body: Joi.object({
      id: Joi.string().required(),
    }),
  }),
  async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { user } = await supabase.auth.api.getUserByCookie(req);

    if (!user) {
      res.status(401).send({ message: "Unauthorized" });

      return;
    }

    const connection = await prisma.connections.findFirst({
      where: {
        id: req.body.id,
        user_id: user.id,
      },
    });

    if (!connection) {
      res.status(404).send({ message: "Connection not found" });

      return;
    }

    const credentials = connection.credentials as EhubCzCreditials;

    const api = new EhubCzApi(credentials.publisher_id, credentials.api_key);
    const task = new EhubCzTask(api);

    await task.import(connection.id);

    res.status(200).json({ message: "Import finisted" });
  },
);
