export type Connection = {
  id: string;
  type: string;
  name: string;
  user_id: string;
};

export type Campaign = {
  id: string;
  identifier: string;
  name: string;
  web_url?: string;
  logo_url?: string;
  maximum_approval_period?: number;
  connection_id: string;
};

export type Commission = {
  id: string;
  identifier: string;
  confirmation_status: string;
  payout_status: string;
  commission: number;
  amount: number;
  currency: string;
  locked_until: string;
  completed_at?: string;
  created_at: string;
  campaign_id: string;
};

export type EhubCzCreditials = {
  publisher_id: string;
  api_key: string;
};

export type EhubCzCampaign = {
  id: string;
  name: string;
  logoUrl: string;
  web: string;
  maxApprovalInterval: number;
};

export type EhubCzTransaction = {
  id: string;
  dateInserted: string;
  campaignId: string;
  commission: number;
  amount: number;
  status: "pre-approved" | "approved" | "pending" | "declined";
  payoutStatus: "paid" | "unpaid";
};

export type EhubCzApiCampaignParams = {
  page: number;
  perPage: number;
};

export type EhubCzApiTransactionParams = {
  sort?: string;
  dateInsertedFrom?: string;
  perPage: number;
  page: number;
};
