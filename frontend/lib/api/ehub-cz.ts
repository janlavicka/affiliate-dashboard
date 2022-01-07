import { EhubCzApiTransactionParams, EhubCzApiCampaignParams } from "@/types";
import axios from "axios";

export default class EhubCzApi {
  private publisherId: string;

  private apiKey: string;

  constructor(publisherId: string, apiKey: string) {
    this.publisherId = publisherId;
    this.apiKey = apiKey;
  }

  async varify() {
    try {
      await axios.get(
        `https://api.ehub.cz/v3/publishers/${this.publisherId}/transactions?apiKey=${this.apiKey}`,
      );

      return true;
    } catch (error) {
      return false;
    }
  }

  async getCampaigns(
    params: EhubCzApiCampaignParams = { perPage: 50, page: 1 },
  ) {
    const urlParams = Object.entries(params)
      .map((kv) => kv.join("="))
      .join("&");

    return axios.get(
      `https://api.ehub.cz/v3/publishers/${this.publisherId}/campaigns?apiKey=${this.apiKey}&${urlParams}`,
    );
  }

  async getTransactions(
    params: EhubCzApiTransactionParams = { perPage: 50, page: 1 },
  ) {
    const urlParams = Object.entries(params)
      .map((kv) => kv.join("="))
      .join("&");

    return axios.get(
      `https://api.ehub.cz/v3/publishers/${this.publisherId}/transactions?apiKey=${this.apiKey}&${urlParams}`,
    );
  }
}
