import { describe, expect, it } from "vitest";
import {
  timeAgo,
  formatJoinDate,
} from "../../../../src/features/feed/utils/timeAgo";

function formatDate(minutesAgo: number): string {
  const date = new Date();
  date.setMinutes(date.getMinutes() - minutesAgo);
  return date.toISOString();
}

describe("timeAgo", () => {
  describe("timeAgo - timeAgo", () => {
    it("should return empty string when createdAt is undefined", () => {
      expect(timeAgo(undefined)).toBe("");
    });

    it("should return minutes when under 60 minutes", () => {
      const createdAt = formatDate(10);

      expect(timeAgo(createdAt)).toBe("10m");
    });

    it("should return hours when under 24 hours", () => {
      const createdAt = formatDate(120);

      expect(timeAgo(createdAt)).toBe("2h");
    });

    it("should return formatted date when over 24 hours (same year)", () => {
      const date = new Date();
      date.setDate(date.getDate() - 3);

      const result = timeAgo(date.toISOString());

      expect(result).toMatch(/\d{1,2}\s\w+/);
    });

    it("should not return negative values for future dates", () => {
      const future = new Date();
      future.setMinutes(future.getMinutes() + 10);

      expect(timeAgo(future.toISOString())).toBe("0m");
    });
  });

  describe("timeAgo - formatJoinDate", () => {
    it("should return empty string when createdAt is undefined", () => {
      expect(formatJoinDate(undefined)).toBe("");
    });

    it("should format join date correctly", () => {
      const date = new Date("2023-01-01");

      const result = formatJoinDate(date.toISOString());

      expect(result).toContain("Ingressou em");
    });

    it("should include month and year in output", () => {
      const date = new Date("2022-05-10");

      const result = formatJoinDate(date.toISOString());

      expect(result).toMatch(/Ingressou em/i);
      expect(result).toMatch(/\d{4}/);
    });
  });
});
