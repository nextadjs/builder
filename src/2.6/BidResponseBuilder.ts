import { uuid } from "@/libraries/uuid";
import type { IV26BidResponseBuilder } from "@/types/interface";
import type { BidResponseV26, SeatBidV26, BidV26 } from "@/types/openrtb";
import type { NoBidReasonCode } from "iab-openrtb/v26";

/**
 * Builder for creating OpenRTB 2.6 BidResponse objects
 */
export class BidResponseBuilder implements IV26BidResponseBuilder {
  private response: Partial<BidResponseV26>;
  private currentSeatBid: Partial<SeatBidV26> | null = null;
  private commonBidProps: Partial<BidV26> = {};

  public constructor() {
    this.response = {
      seatbid: [],
    };
  }

  public reset(): this {
    const newInstance = new BidResponseBuilder();
    Object.assign(this, newInstance);
    return this;
  }

  /**
   * Sets the ID of the bid response
   */
  public withId(id: string): this {
    this.response.id = id;
    return this;
  }

  /**
   * Sets the bidder generated response ID
   */
  public withBidId(bidid: string): this {
    this.response.bidid = bidid;
    return this;
  }

  /**
   * Sets the bid currency
   */
  public withCurrency(cur: string): this {
    this.response.cur = cur;
    return this;
  }

  /**
   * Sets custom data for cookie
   */
  public withCustomData(customdata: string): this {
    this.response.customdata = customdata;
    return this;
  }

  /**
   * Sets the reason for not bidding
   */
  public withNoBidReason(nbr: NoBidReasonCode): this {
    this.response.nbr = nbr;
    return this;
  }

  /**
   * Sets extension data
   */
  public withExtension(ext: Record<string, unknown>): this {
    this.response.ext = {
      ...this.response.ext,
      ...ext,
    };
    return this;
  }

  /**
   * Begins a new seatbid section
   */
  public beginSeatBid(seat?: string): this {
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
  public withCommonBid(props: Partial<BidV26>): this {
    this.commonBidProps = {
      ...this.commonBidProps,
      ...props,
    };
    return this;
  }

  /**
   * Sets group flag for the current seatbid
   */
  public withGroup(group: 0 | 1): this {
    if (this.currentSeatBid) {
      this.currentSeatBid.group = group;
    }
    return this;
  }

  /**
   * Adds a new bid to the current seatbid
   */
  public addBid(
    props: Partial<BidV26> & { impid: string; price: number }
  ): this {
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
  public addBannerBid(
    props: Partial<BidV26> & { impid: string; price: number }
  ): this {
    this.addBid({
      mtype: 1,
      ...props,
    });

    return this;
  }

  /**
   * Shortcut method for adding a audio bid
   */
  public addAudioBid(
    props: Partial<BidV26> & { impid: string; price: number }
  ): this {
    this.addBid({
      mtype: 3,
      ...props,
    });

    return this;
  }

  /**
   * Shortcut method for adding a video bid
   */
  public addVideoBid(
    props: Partial<BidV26> & { impid: string; price: number }
  ): this {
    this.addBid({
      mtype: 2,
      ...props,
    });

    return this;
  }

  /**
   * Shortcut method for adding a native bid
   */
  public addNativeBid(
    props: Partial<BidV26> & { impid: string; price: number }
  ): this {
    this.addBid({
      mtype: 4,
      ...props,
    });

    return this;
  }

  /**
   * Builds and returns the final BidResponse object
   */
  public build(): BidResponseV26 {
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
