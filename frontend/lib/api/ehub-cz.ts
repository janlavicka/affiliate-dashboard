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
}
