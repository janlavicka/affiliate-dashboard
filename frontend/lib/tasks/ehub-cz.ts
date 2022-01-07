import dayjs from "dayjs";
import { EhubCzCampaign, EhubCzTransaction } from "@/types";
import { prisma } from "@/lib/prisma";
import EhubCzApi from "@/lib/api/ehub-cz";

export default class EhubCzTask {
  private api: EhubCzApi;

  constructor(api: EhubCzApi) {
    this.api = api;
  }

  async import(connectionId: string) {
    const campaignIds = {} as {
      [key: string]: {
        id: string;
        maximum_approval_period: number;
      };
    };

    let page = 1;
    let response = null;

    do {
      response = await this.api.getCampaigns({ perPage: 50, page });

      const campaigns = response.data.campaigns as EhubCzCampaign[];

      for (const campaign of campaigns) {
        let record = await prisma.campaigns.findFirst({
          where: {
            identifier: campaign.id,
            connection_id: connectionId,
          },
        });

        if (record) {
          record = await prisma.campaigns.update({
            where: {
              id: record.id,
            },
            data: {
              name: campaign.name,
              web_url: campaign.web,
              logo_url: campaign.logoUrl,
              maximum_approval_period: campaign.maxApprovalInterval,
            },
          });
        } else {
          record = await prisma.campaigns.create({
            data: {
              identifier: campaign.id,
              name: campaign.name,
              web_url: campaign.web,
              logo_url: campaign.logoUrl,
              maximum_approval_period: campaign.maxApprovalInterval,
              connections: { connect: { id: connectionId } },
            },
          });
        }

        campaignIds[record.identifier] = {
          id: record.id,
          maximum_approval_period: record.maximum_approval_period as number,
        };
      }

      page++;
    } while (response.data.totalItems > 50 * (page - 1));

    page = 1;
    response = null;
    const startDate = dayjs().subtract(6, "month");

    do {
      response = await this.api.getTransactions({
        sort: "dateInserted",
        dateInsertedFrom: startDate.format("YYYY-MM-DDTHH:mm:ss"),
        perPage: 50,
        page,
      });

      const transactions = response.data.transactions as EhubCzTransaction[];

      for (const transaction of transactions) {
        const confirmationStatus =
          EhubCzTask.getConfirmationStatus(transaction);
        const payoutStatus = EhubCzTask.getPayoutStatus(transaction);
        const isCompleted = EhubCzTask.isCompleted(transaction);

        let record = await prisma.commissions.findFirst({
          where: {
            identifier: transaction.id,
            campaigns: {
              id: campaignIds[transaction.campaignId].id,
            },
          },
        });

        const lockedUntil = dayjs(transaction.dateInserted).add(
          campaignIds[transaction.campaignId].maximum_approval_period,
          "day",
        );
        const completedAt = isCompleted
          ? lockedUntil.unix() < dayjs().unix()
            ? lockedUntil.toDate()
            : dayjs().toDate()
          : null;

        if (record) {
          await prisma.commissions.update({
            where: {
              id: record.id,
            },
            data: {
              confirmation_status: confirmationStatus,
              payout_status: payoutStatus,
              commission: transaction.commission,
              amount: transaction.amount,
              completed_at: record.completed_at
                ? record.completed_at
                : completedAt,
            },
          });
        } else {
          await prisma.commissions.create({
            data: {
              identifier: transaction.id,
              confirmation_status: confirmationStatus,
              payout_status: payoutStatus,
              commission: transaction.commission,
              amount: transaction.amount,
              currency: "CZK",
              locked_until: lockedUntil.toDate(),
              completed_at: completedAt,
              created_at: dayjs(transaction.dateInserted).toDate(),
              campaign_id: campaignIds[transaction.campaignId].id,
            },
          });
        }
      }

      page++;
    } while (response.data.totalItems > 50 * (page - 1));
  }

  static getConfirmationStatus(transaction: EhubCzTransaction) {
    switch (transaction.status) {
      case "pre-approved":
        return "pending";
      case "approved":
        return "approved";
      case "pending":
        return "pending";
      case "declined":
        return "rejected";
      default:
        return "pending";
    }
  }

  static getPayoutStatus(transaction: EhubCzTransaction) {
    switch (transaction.payoutStatus) {
      case "unpaid":
        return "unpaid";
      case "paid":
        return "paid";
      default:
        return "unpaid";
    }
  }

  static isCompleted(transaction: EhubCzTransaction) {
    switch (transaction.status) {
      case "pending":
        return false;
      case "approved":
      case "declined":
        return true;
      default:
        return false;
    }
  }
}
