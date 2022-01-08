import { Commission } from "@/types";
import dayjs from "dayjs";
import { useContext, useMemo } from "react";
import { AuthContext } from "./context";

export const useAuth = () => useContext(AuthContext);

export const useDateRange = () => {
  return useMemo<dayjs.Dayjs[]>(() => {
    const range = [];
    const startDate = dayjs().set("date", 1);

    for (let i = 12; i > -3; i--) {
      range.push(startDate.subtract(i - 1, "month"));
    }

    return range;
  }, []);
};

export const useNewSeries = (
  dateRange: dayjs.Dayjs[],
  commissions: Commission[],
) => {
  return useMemo(() => {
    const range = dateRange.reduce<{ [key: string]: number }>(
      (acc, date) => ({ ...acc, [date.format("YYYY-MM")]: 0 }),
      {},
    );

    commissions.forEach((commission) => {
      const date = dayjs(commission.created_at);

      range[date.format("YYYY-MM")] += commission.commission;
    });

    return Object.values(range);
  }, [commissions]);
};

export const useApprovedSeries = (
  dateRange: dayjs.Dayjs[],
  commissions: Commission[],
) => {
  return useMemo(() => {
    const range = dateRange.reduce<{ [key: string]: number }>(
      (acc, date) => ({ ...acc, [date.format("YYYY-MM")]: 0 }),
      {},
    );

    commissions
      .filter((commission) => commission.confirmation_status === "approved")
      .forEach((commission) => {
        const date = dayjs(commission.completed_at);

        range[date.format("YYYY-MM")] += commission.commission;
      });

    return Object.values(range);
  }, [commissions]);
};

export const useExpectedSeries = (
  dateRange: dayjs.Dayjs[],
  commissions: Commission[],
) => {
  return useMemo(() => {
    const range = dateRange.reduce<{ [key: string]: number }>(
      (acc, date) => ({ ...acc, [date.format("YYYY-MM")]: 0 }),
      {},
    );

    commissions
      .filter(
        (commission) =>
          !commission.completed_at &&
          commission.confirmation_status === "pending",
      )
      .forEach((commission) => {
        const date = dayjs(commission.locked_until);

        range[date.format("YYYY-MM")] += commission.commission;
      });

    return Object.values(range);
  }, [commissions]);
};
