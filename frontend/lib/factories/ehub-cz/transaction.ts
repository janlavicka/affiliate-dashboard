import faker from "faker";
import dayjs from "dayjs";
import { EhubCzTransaction } from "@/types";

export const TransactionFactory = {
  build: (attrs: Partial<EhubCzTransaction> = {}) => {
    return {
      id: faker.datatype.uuid(),
      dateInserted: dayjs(faker.date.past()).toISOString(),
      campaignId: faker.datatype.uuid(),
      commission: faker.datatype.number(100),
      amount: faker.datatype.number(1000),
      status: faker.random.arrayElement([
        "pre-approved",
        "approved",
        "pending",
        "declined",
      ]),
      payoutStatus: faker.random.arrayElement(["paid", "unpaid"]),
      ...attrs,
    };
  },
};
