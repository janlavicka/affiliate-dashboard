import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import faker from "faker";

export const ConnectionFactory = {
  build: (attrs: Partial<Prisma.connectionsCreateInput> = {}) => {
    return {
      name: faker.random.word(),
      type: "ehub_cz",
      credentials: {
        api_key: faker.datatype.uuid(),
        published_id: faker.datatype.uuid(),
      },
      ...attrs,
    } as Prisma.connectionsCreateInput;
  },

  create: async (attrs: Partial<Prisma.connectionsCreateInput> = {}) => {
    const connection = ConnectionFactory.build(attrs);

    return await prisma.connections.create({ data: connection });
  },
};
