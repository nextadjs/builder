import type { IV26BidResponseBuilder } from "@/types/interface";
import type { BidResponseV26, BidV26 } from "@/types/openrtb";
import type { NoBidReasonCode } from "iab-openrtb/v26";

/**
 * Abstract base decorator class for BidResponseBuilder
 */
export abstract class BidResponseBuilderDecorator
  implements IV26BidResponseBuilder
{
  protected constructor(protected readonly builder: IV26BidResponseBuilder) {}

  public withId(id: string): this {
    this.builder.withId(id);
    return this;
  }

  public withBidId(bidid: string): this {
    this.builder.withBidId(bidid);
    return this;
  }

  public withCurrency(cur: string): this {
    this.builder.withCurrency(cur);
    return this;
  }

  public withCustomData(customdata: string): this {
    this.builder.withCustomData(customdata);
    return this;
  }

  public withNoBidReason(nbr: NoBidReasonCode): this {
    this.builder.withNoBidReason(nbr);
    return this;
  }

  public withExtension(ext: Record<string, unknown>): this {
    this.builder.withExtension(ext);
    return this;
  }

  public beginSeatBid(seat?: string): this {
    this.builder.beginSeatBid(seat);
    return this;
  }

  public withCommonBid(props: Partial<BidV26>): this {
    this.builder.withCommonBid(props);
    return this;
  }

  public withGroup(group: 0 | 1): this {
    this.builder.withGroup(group);
    return this;
  }

  public addBid(
    props: Partial<BidV26> & { impid: string; price: number }
  ): this {
    this.builder.addBid(props);
    return this;
  }

  public addBannerBid(
    props: Partial<BidV26> & { impid: string; price: number }
  ): this {
    this.builder.addBannerBid(props);
    return this;
  }

  public addAudioBid(
    props: Partial<BidV26> & { impid: string; price: number }
  ): this {
    this.builder.addAudioBid(props);
    return this;
  }

  public addVideoBid(
    props: Partial<BidV26> & { impid: string; price: number }
  ): this {
    this.builder.addVideoBid(props);
    return this;
  }

  public addNativeBid(
    props: Partial<BidV26> & { impid: string; price: number }
  ): this {
    this.builder.addNativeBid(props);
    return this;
  }

  public build(): BidResponseV26 {
    return this.builder.build();
  }
}
