import { CampaignFactory } from "@/lib/factories/ehub-cz/campaign";
import { TransactionFactory } from "@/lib/factories/ehub-cz/transaction";
import { ConnectionFactory } from "@/lib/factories/connection";
import EhubCzApi from "@/lib/api/ehub-cz";
import EhubCzTask from "@/lib/tasks/ehub-cz";
import faker from "faker";
import { prisma, disconnect } from "@/lib/prisma";

describe("ehub.cz task", () => {
  afterEach(async () => {
    await disconnect();
  });

  describe("ehub.cz import", () => {
    let api;
    let task;
    let connection;

    beforeEach(async () => {
      api = new EhubCzApi("123", "456");
      task = new EhubCzTask(api);

      connection = await ConnectionFactory.create({
        user_id: faker.datatype.uuid(),
      });
    });

    it("should import data from API", async () => {
      const campaigns = [CampaignFactory.build(), CampaignFactory.build()];
      const transactions = [
        TransactionFactory.build({ campaignId: campaigns[0].id }),
        TransactionFactory.build({ campaignId: campaigns[0].id }),
      ];

      api.getCampaigns = jest
        .fn()
        .mockResolvedValue({ data: { campaigns, totalItems: 2 } });
      api.getTransactions = jest
        .fn()
        .mockResolvedValue({ data: { transactions, totalItems: 2 } });

      await task.import(connection.id);

      expect(api.getCampaigns).toHaveBeenCalled();
      expect(api.getTransactions).toHaveBeenCalled();

      expect(
        await prisma.campaigns.count({
          where: { connection_id: connection.id },
        }),
      ).toBe(2);
      expect(
        await prisma.commissions.count({
          where: {
            campaigns: {
              connections: {
                id: connection.id,
              },
            },
          },
        }),
      ).toBe(2);
    });
  });

  it("should convert transaction into confirmation status", () => {
    let transaction = TransactionFactory.build({ status: "pre-approved" });
    expect(EhubCzTask.getConfirmationStatus(transaction)).toBe("pending");

    transaction = TransactionFactory.build({ status: "approved" });
    expect(EhubCzTask.getConfirmationStatus(transaction)).toBe("approved");

    transaction = TransactionFactory.build({ status: "pending" });
    expect(EhubCzTask.getConfirmationStatus(transaction)).toBe("pending");

    transaction = TransactionFactory.build({ status: "declined" });
    expect(EhubCzTask.getConfirmationStatus(transaction)).toBe("rejected");

    transaction = TransactionFactory.build({ status: "unknown" });
    expect(EhubCzTask.getConfirmationStatus(transaction)).toBe("pending");
  });

  it("should convert transaction into payout status", () => {
    let transaction = TransactionFactory.build({ payoutStatus: "unpaid" });
    expect(EhubCzTask.getPayoutStatus(transaction)).toBe("unpaid");

    transaction = TransactionFactory.build({ payoutStatus: "paid" });
    expect(EhubCzTask.getPayoutStatus(transaction)).toBe("paid");

    transaction = TransactionFactory.build({ payoutStatus: "unknown" });
    expect(EhubCzTask.getPayoutStatus(transaction)).toBe("unpaid");
  });

  it("should convert transaction into completion status", () => {
    let transaction = TransactionFactory.build({ status: "pre-approved" });
    expect(EhubCzTask.isCompleted(transaction)).toBeFalsy();

    transaction = TransactionFactory.build({ status: "approved" });
    expect(EhubCzTask.isCompleted(transaction)).toBeTruthy();

    transaction = TransactionFactory.build({ status: "pending" });
    expect(EhubCzTask.isCompleted(transaction)).toBeFalsy();

    transaction = TransactionFactory.build({ status: "declined" });
    expect(EhubCzTask.isCompleted(transaction)).toBeTruthy();

    transaction = TransactionFactory.build({ status: "unknown" });
    expect(EhubCzTask.isCompleted(transaction)).toBeFalsy();
  });
});
