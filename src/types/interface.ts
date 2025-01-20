import type {
  BidRequestV26,
  SiteV26,
  DeviceV26,
  UserV26,
  SourceV26,
  RegsV26,
  ImpV26,
  AppV26,
  DOOHV26,
  BidV26,
  BidResponseV26,
  GeoV26,
} from "@/types/openrtb";
import type { NoBidReasonCode } from "iab-openrtb/v26";

/**
 * Interface for OpenRTB 2.6 BidRequest builder
 */
export interface IV26BidRequestBuilder {
  withId(id: string): this;
  addImp(props?: Partial<ImpV26>): this;
  withSite(site: Partial<SiteV26>): this;
  withApp(app: Partial<AppV26>): this;
  withDOOH(dooh: Partial<DOOHV26>): this;
  withDevice(device: Partial<DeviceV26>): this;
  withUser(user: Partial<UserV26>): this;
  withTest(test: 0 | 1): this;
  withAuctionType(at: number): this;
  withTimeout(tmax: number): this;
  withWhitelistedSeats(wseat: string[]): this;
  withBlockedSeats(bseat: string[]): this;
  withAllImps(allimps: 0 | 1): this;
  withCurrencies(cur: string[]): this;
  withLanguages(wlang: string[]): this;
  withLanguagesBCP47(wlangb: string[]): this;
  withAllowedCategories(acat: string[]): this;
  withBlockedCategories(bcat: string[]): this;
  withCategoryTaxonomy(cattax: number): this;
  withBlockedAdvertisers(badv: string[]): this;
  withBlockedApps(bapp: string[]): this;
  withSource(source: SourceV26): this;
  withRegulations(regs: RegsV26): this;
  withExt(ext: Record<string, unknown>): this;
  withCommonImp(props: Partial<ImpV26>): this;
  withGeo(geo: Partial<GeoV26>): this;
  build(): BidRequestV26;
  reset(): this;
}

/**
 * Interface for OpenRTB 2.6 BidResponse builder
 */
export interface IV26BidResponseBuilder {
  withId(id: string): this;
  withBidId(bidid: string): this;
  withCurrency(cur: string): this;
  withCustomData(customdata: string): this;
  withNoBidReason(nbr: NoBidReasonCode): this;
  withExtension(ext: Record<string, unknown>): this;
  beginSeatBid(seat?: string): this;
  withCommonBid(props: Partial<BidV26>): this;
  withGroup(group: 0 | 1): this;
  addBid(props: Partial<BidV26> & { impid: string; price: number }): this;
  addBannerBid(props: Partial<BidV26> & { impid: string; price: number }): this;
  addAudioBid(props: Partial<BidV26> & { impid: string; price: number }): this;
  addVideoBid(props: Partial<BidV26> & { impid: string; price: number }): this;
  addNativeBid(props: Partial<BidV26> & { impid: string; price: number }): this;
  build(): BidResponseV26;
  reset(): this;
}
