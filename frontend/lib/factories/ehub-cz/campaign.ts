import faker from "faker";
import { EhubCzCampaign } from "@/types";

export const CampaignFactory = {
  build: (attrs: Partial<EhubCzCampaign> = {}) => {
    return {
      id: faker.datatype.uuid(),
      name: faker.random.word(),
      logoUrl: faker.image.abstract(50, 50),
      web: faker.internet.url(),
      maxApprovalInterval: faker.datatype.number(60),
      ...attrs,
    };
  },
};
