import MockDate from "mockdate";
import { renderHook } from "@testing-library/react-hooks";
import {
  useDateRange,
  useNewSeries,
  useApprovedSeries,
  useExpectedSeries,
} from "@/lib/hooks";
import { CommissionFactory } from "@/lib/factories/commission";
import dayjs from "dayjs";

describe("hooks", () => {
  let dateRange = {};
  let commisions = [];

  beforeEach(() => {
    MockDate.set(new Date("2020-06-01"));

    dateRange = [
      dayjs("2019-07-01"),
      dayjs("2019-08-01"),
      dayjs("2019-09-01"),
      dayjs("2019-10-01"),
      dayjs("2019-11-01"),
      dayjs("2019-12-01"),
      dayjs("2020-01-01"),
      dayjs("2020-02-01"),
      dayjs("2020-03-01"),
      dayjs("2020-04-01"),
      dayjs("2020-05-01"),
      dayjs("2020-06-01"),
      dayjs("2020-07-01"),
      dayjs("2020-08-01"),
      dayjs("2020-09-01"),
    ];

    commisions = [
      CommissionFactory.build({
        confirmation_status: "pending",
        payout_status: "unpaid",
        commission: 10,
        amount: 100,
        created_at: dayjs("2020-05-02").format("YYYY-MM-DDTHH:mm:ss"),
        locked_until: dayjs("2020-08-02").format("YYYY-MM-DDTHH:mm:ss"),
        completed_at: null,
      }),
      CommissionFactory.build({
        confirmation_status: "approved",
        payout_status: "unpaid",
        commission: 11,
        amount: 110,
        created_at: dayjs("2020-01-03").format("YYYY-MM-DDTHH:mm:ss"),
        locked_until: dayjs("2020-03-03").format("YYYY-MM-DDTHH:mm:ss"),
        completed_at: dayjs("2020-02-20").format("YYYY-MM-DDTHH:mm:ss"),
      }),
      CommissionFactory.build({
        confirmation_status: "approved",
        payout_status: "unpaid",
        commission: 12,
        amount: 120,
        created_at: dayjs("2020-01-03").format("YYYY-MM-DDTHH:mm:ss"),
        locked_until: dayjs("2020-03-03").format("YYYY-MM-DDTHH:mm:ss"),
        completed_at: dayjs("2020-02-21").format("YYYY-MM-DDTHH:mm:ss"),
      }),
      CommissionFactory.build({
        confirmation_status: "rejected",
        payout_status: "unpaid",
        commission: 13,
        amount: 130,
        created_at: dayjs("2020-02-04").format("YYYY-MM-DDTHH:mm:ss"),
        locked_until: dayjs("2020-04-04").format("YYYY-MM-DDTHH:mm:ss"),
        completed_at: null,
      }),
    ];
  });

  describe("useDateRange", () => {
    it("should create date range of last year + 3 months in the future", () => {
      const { result } = renderHook(() => useDateRange());

      expect(result.current.length).toBe(15);
    });
  });

  describe("useNewSeries", () => {
    it("should create object with values of new commisions by month", () => {
      const { result } = renderHook(() => useNewSeries(dateRange, commisions));

      expect(result.current.length).toBe(15);
      expect(result.current).toEqual([
        0, 0, 0, 0, 0, 0, 23, 13, 0, 0, 10, 0, 0, 0, 0,
      ]);
    });
  });

  describe("useApprovedSeries", () => {
    it("should create object with values of commissions by approval month", () => {
      const { result } = renderHook(() =>
        useApprovedSeries(dateRange, commisions),
      );

      expect(result.current.length).toBe(15);
      expect(result.current).toEqual([
        0, 0, 0, 0, 0, 0, 0, 23, 0, 0, 0, 0, 0, 0, 0,
      ]);
    });
  });

  describe("useExpectedSeries", () => {
    it("should create object with values of expected approvals by month", () => {
      const { result } = renderHook(() =>
        useExpectedSeries(dateRange, commisions),
      );

      expect(result.current.length).toBe(15);
      expect(result.current).toEqual([
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 0,
      ]);
    });
  });
});
