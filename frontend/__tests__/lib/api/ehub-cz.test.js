import axios from "axios";
import EhubCzApi from "@/lib/api/ehub-cz";

jest.mock("axios");

describe("ehub.cz API", () => {
  it("should check if the creditials are valid", async () => {
    axios.get = jest
      .fn()
      .mockRejectedValueOnce("Unauthorized")
      .mockResolvedValueOnce({ transactions: [], totalItems: 0 });

    const api = new EhubCzApi("123", "456");

    expect(await api.varify()).toBeFalsy();

    expect(await api.varify()).toBeTruthy();

    expect(axios.get).toHaveBeenCalledTimes(2);
  });

  it("should get the list of campaigns", async () => {
    axios.get = jest
      .fn()
      .mockResolvedValueOnce({ campaigns: [], totalItems: 0 });

    const api = new EhubCzApi("123", "456");

    expect(await api.getCampaigns()).toEqual({
      campaigns: [],
      totalItems: 0,
    });

    expect(axios.get).toHaveBeenCalledWith(
      "https://api.ehub.cz/v3/publishers/123/campaigns?apiKey=456&perPage=50&page=1",
    );
    expect(axios.get).toHaveBeenCalledTimes(1);
  });

  it("should get the list of transactions", async () => {
    axios.get = jest
      .fn()
      .mockResolvedValueOnce({ transactions: [], totalItems: 0 });

    const api = new EhubCzApi("123", "456");

    expect(await api.getTransactions()).toEqual({
      transactions: [],
      totalItems: 0,
    });

    expect(axios.get).toHaveBeenCalledWith(
      "https://api.ehub.cz/v3/publishers/123/transactions?apiKey=456&perPage=50&page=1",
    );
    expect(axios.get).toHaveBeenCalledTimes(1);
  });
});
