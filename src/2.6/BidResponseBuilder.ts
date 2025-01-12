import { uuid } from "@/libraries/uuid";
import type { BidResponseV26, SeatBidV26, BidV26 } from "@/types/openrtb";
import type { NoBidReasonCode } from "iab-openrtb/v26";

/**
 * Builder for creating OpenRTB 2.6 BidResponse objects
 */
export class BidResponseBuilder {
  private response: Partial<BidResponseV26>;
  private currentSeatBid: Partial<SeatBidV26> | null = null;
  private commonBidProps: Partial<BidV26> = {};

  constructor() {
    this.response = {
      seatbid: [],
    };
  }

  /**
   * Sets the ID of the bid response
   */
  withId(id: string): this {
    this.response.id = id;
    return this;
  }

  /**
   * Sets the bidder generated response ID
   */
  withBidId(bidid: string): this {
    this.response.bidid = bidid;
    return this;
  }

  /**
   * Sets the bid currency
   */
  withCurrency(cur: string): this {
    this.response.cur = cur;
    return this;
  }

  /**
   * Sets custom data for cookie
   */
  withCustomData(customdata: string): this {
    this.response.customdata = customdata;
    return this;
  }

  /**
   * Sets the reason for not bidding
   */
  withNoBidReason(nbr: NoBidReasonCode): this {
    this.response.nbr = nbr;
    return this;
  }

  /**
   * Sets extension data
   */
  withExtension(ext: Record<string, unknown>): this {
    this.response.ext = {
      ...this.response.ext,
      ...ext,
    };
    return this;
  }

  /**
   * Begins a new seatbid section
   */
  beginSeatBid(seat?: string): this {
    this.currentSeatBid = {
      bid: [],
      seat,
    };
    this.response.seatbid!.push(this.currentSeatBid as SeatBidV26);
    return this;
  }

  /**
   * Sets common properties for all bids
   */
  withCommonBid(props: Partial<BidV26>): this {
    this.commonBidProps = {
      ...this.commonBidProps,
      ...props,
    };
    return this;
  }

  /**
   * Sets group flag for the current seatbid
   */
  withGroup(group: 0 | 1): this {
    if (this.currentSeatBid) {
      this.currentSeatBid.group = group;
    }
    return this;
  }

  /**
   * Adds a new bid to the current seatbid
   */
  addBid(props: Partial<BidV26> & { impid: string; price: number }): this {
    if (!this.currentSeatBid) {
      this.beginSeatBid();
    }

    const newBid: BidV26 = {
      id: uuid(),
      ...props,
    };

    this.currentSeatBid!.bid!.push(newBid);
    return this;
  }

  /**
   * Shortcut method for adding a banner bid
   */
  addBannerBid(
    props: Partial<BidV26> & { impid: string; price: number }
  ): this {
    this.addBid({
      mtype: 1,
      ...props,
    });

    return this;
  }

  /**
   * Shortcut method for adding a video bid
   */
  addVideoBid(props: Partial<BidV26> & { impid: string; price: number }): this {
    this.addBid({
      mtype: 2,
      ...props,
    });

    return this;
  }

  /**
   * Shortcut method for adding a native bid
   */
  addNativeBid(
    props: Partial<BidV26> & { impid: string; price: number }
  ): this {
    this.addBid({
      mtype: 3,
      ...props,
    });

    return this;
  }

  /**
   * Builds and returns the final BidResponse object
   */
  build(): BidResponseV26 {
    if (Object.keys(this.commonBidProps).length > 0 && this.response.seatbid) {
      for (const seatbid of this.response.seatbid) {
        seatbid.bid = seatbid.bid.map((bid) => ({
          ...bid,
          ...this.commonBidProps,
        }));
      }
    }

    return this.response as BidResponseV26;
  }
}
