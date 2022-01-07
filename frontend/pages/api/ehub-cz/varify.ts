import EhubCzApi from "@/lib/api/ehub-cz";
import validation from "@/lib/middlewares/validation";
import { supabase } from "@/lib/supabase";
import Joi from "joi";
import type { NextApiRequest, NextApiResponse } from "next";
import connect from "next-connect";

type Data = {
  message: string;
  varified?: Boolean;
};

export default connect().post(
  validation({
    body: Joi.object({
      publisher_id: Joi.string().required(),
      api_key: Joi.string().required(),
    }),
  }),
  async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { user } = await supabase.auth.api.getUserByCookie(req);

    if (!user) {
      res.status(401).send({ message: "Unauthorized" });

      return;
    }

    const api = new EhubCzApi(req.body.publisher_id, req.body.api_key);

    // varify connection by
    if (await api.varify()) {
      res.status(200).json({ message: "Varified", varified: true });
    } else {
      res.status(200).json({ message: "Not varified", varified: false });
    }
  },
);
