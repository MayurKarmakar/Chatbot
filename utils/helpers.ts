"use client";

import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);

/**
 * Formats a Date object into the "14th April at 07:08:49PM" format.
 * @param {Date} date - The Date object to be formatted.
 * @returns {string} The formatted date string.
 */
function formatDate(
  timestamp: number,
  format: string,
  forHeader: boolean
): string {
  if (typeof window === "undefined") return "";
  const today = dayjs();
  const dateFromTimestamp = dayjs.unix(timestamp);

  if (forHeader) {
    if (today.isSame(dateFromTimestamp, "date")) {
      return "Today";
    }
  }

  return dateFromTimestamp.format(format);
}

export { formatDate };

