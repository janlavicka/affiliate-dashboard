import { Commission } from "./../../types";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import faker from "faker";

export const CommissionFactory = {
  build: (attrs: Partial<Prisma.commissionsCreateInput> = {}) => {
    return {
      identifier: faker.datatype.uuid(),
      confirmation_status: faker.random.arrayElement([
        "pending",
        "approved",
        "rejected",
      ]),
      payout_status: faker.random.arrayElement(["paid", "unpaid"]),
      commission: faker.datatype.number(100),
      amount: faker.datatype.number(1000),
      currency: "CZK",
      locked_until: faker.date.future(),
      completed_at: faker.date.recent(),
      created_at: faker.date.past(),
      ...attrs,
    } as Prisma.commissionsCreateInput;
  },

  create: async (attrs: Partial<Prisma.commissionsCreateInput> = {}) => {
    const commission = CommissionFactory.build(attrs);

    return await prisma.commissions.create({ data: commission });
  },
};
