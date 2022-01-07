import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import faker from "faker";

export const CampaignFactory = {
  build: (attrs: Partial<Prisma.campaignsCreateInput> = {}) => {
    return {
      identifier: faker.datatype.uuid(),
      name: faker.random.word(),
      web_url: faker.internet.url(),
      logo_url: faker.image.abstract(50, 50),
      maximum_approval_period: faker.datatype.number(60),
      ...attrs,
    } as Prisma.campaignsCreateInput;
  },

  create: async (attrs: Partial<Prisma.campaignsCreateInput> = {}) => {
    const campaign = CampaignFactory.build(attrs);

    return await prisma.campaigns.create({ data: campaign });
  },
};
