import { describe, it, expect } from "vitest";
import { BidResponseBuilder } from "@/2.6/BidResponseBuilder";

describe("Bid Response Builder", () => {
  describe("トップレベルパラメーター", () => {
    it.each([
      {
        method: "withId",
        value: "test-id",
        expectedKey: "id",
        expectedValue: "test-id",
      },
      {
        method: "withBidId",
        value: "bid-id-1",
        expectedKey: "bidid",
        expectedValue: "bid-id-1",
      },
      {
        method: "withCurrency",
        value: "JPY",
        expectedKey: "cur",
        expectedValue: "JPY",
      },
      {
        method: "withCustomData",
        value: "custom-value",
        expectedKey: "customdata",
        expectedValue: "custom-value",
      },
      {
        method: "withNoBidReason",
        value: 2,
        expectedKey: "nbr",
        expectedValue: 2,
      },
      {
        method: "withExtension",
        value: { custom: "value" },
        expectedKey: "ext",
        expectedValue: { custom: "value" },
      },
    ])(
      "$method で指定した値 $value が $expectedKey に設定される",
      ({ method, value, expectedKey, expectedValue }) => {
        const sut = new BidResponseBuilder() as any;
        sut[method](value);
        const result = sut.build();
        expect(result[expectedKey]).toEqual(expectedValue);
      }
    );
  });

  describe("SeatBidとBid操作", () => {
    it("beginSeatBidで新しいseatbidが作成される", () => {
      const builder = new BidResponseBuilder()
        .beginSeatBid("seat1")
        .addBid({ impid: "imp1", price: 1.0 });

      const result = builder.build();
      expect(result.seatbid).toHaveLength(1);
      expect(result.seatbid![0].seat).toBe("seat1");
    });

    it("withGroupでグループフラグが設定される", () => {
      const builder = new BidResponseBuilder()
        .beginSeatBid()
        .withGroup(1)
        .addBid({ impid: "imp1", price: 1.0 });

      const result = builder.build();
      expect(result.seatbid![0].group).toBe(1);
    });

    it("withCommonBidはbuild時に全てのbidに適用される", () => {
      const sut = new BidResponseBuilder()
        .beginSeatBid()
        .addBid({ impid: "imp1", price: 1.0 })
        .addBid({ impid: "imp2", price: 2.0 })
        .withCommonBid({ price: 1 });

      const result = sut.build();
      const bids = result.seatbid![0].bid;
      expect(bids[0].price).toBe(1);
      expect(bids[1].price).toBe(1);
    });

    it("複数のseatbidにもcommonBidが適用される", () => {
      const builder = new BidResponseBuilder()
        .withCommonBid({ price: 2 })
        .beginSeatBid()
        .addBid({ impid: "imp1", price: 1.0 })
        .beginSeatBid()
        .addBid({ impid: "imp2", price: 2.0 });

      const result = builder.build();
      expect(result.seatbid![0].bid[0].price).toBe(2);
      expect(result.seatbid![1].bid[0].price).toBe(2);
    });
  });

  describe("ショートカットメソッド", () => {
    it.each([
      {
        method: "addBannerBid",
        args: [{ price: 2 }],
        expectedType: "mtype",
        expectedValue: 1,
      },
      {
        method: "addVideoBid",
        args: [{ price: 2 }],
        expectedType: "mtype",
        expectedValue: 2,
      },
      {
        method: "addNativeBid",
        args: [{ price: 2 }],
        expectedType: "mtype",
        expectedValue: 4,
      },
    ])(
      "$method でメディアタイプ別のbidが作成される",
      ({ method, args, expectedType, expectedValue }) => {
        const sut = new BidResponseBuilder().beginSeatBid() as any;
        sut[method](...args);

        const result = sut.build();
        const bid = result.seatbid![0].bid[0];
        expect(bid[expectedType]).toBe(expectedValue);
      }
    );
  });
});