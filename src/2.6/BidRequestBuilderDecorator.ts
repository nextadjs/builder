import type { IV26BidRequestBuilder } from "@/types/interface";
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
} from "@/types/openrtb";

/**
 * Abstract base decorator class for BidRequestBuilder
 */
export abstract class BidRequestBuilderDecorator
  implements IV26BidRequestBuilder
{
  protected constructor(protected readonly builder: IV26BidRequestBuilder) {}

  public withId(id: string): this {
    this.builder.withId(id);
    return this;
  }

  public addImp(props?: Partial<ImpV26>): this {
    this.builder.addImp(props);
    return this;
  }

  public withSite(site: Partial<SiteV26>): this {
    this.builder.withSite(site);
    return this;
  }

  public withApp(app: Partial<AppV26>): this {
    this.builder.withApp(app);
    return this;
  }

  public withDOOH(dooh: Partial<DOOHV26>): this {
    this.builder.withDOOH(dooh);
    return this;
  }

  public withDevice(device: Partial<DeviceV26>): this {
    this.builder.withDevice(device);
    return this;
  }

  public withUser(user: Partial<UserV26>): this {
    this.builder.withUser(user);
    return this;
  }

  public withTest(test: 0 | 1): this {
    this.builder.withTest(test);
    return this;
  }

  public withAuctionType(at: number): this {
    this.builder.withAuctionType(at);
    return this;
  }

  public withTimeout(tmax: number): this {
    this.builder.withTimeout(tmax);
    return this;
  }

  public withWhitelistedSeats(wseat: string[]): this {
    this.builder.withWhitelistedSeats(wseat);
    return this;
  }

  public withBlockedSeats(bseat: string[]): this {
    this.builder.withBlockedSeats(bseat);
    return this;
  }

  public withAllImps(allimps: 0 | 1): this {
    this.builder.withAllImps(allimps);
    return this;
  }

  public withCurrencies(cur: string[]): this {
    this.builder.withCurrencies(cur);
    return this;
  }

  public withLanguages(wlang: string[]): this {
    this.builder.withLanguages(wlang);
    return this;
  }

  public withLanguagesBCP47(wlangb: string[]): this {
    this.builder.withLanguagesBCP47(wlangb);
    return this;
  }

  public withAllowedCategories(acat: string[]): this {
    this.builder.withAllowedCategories(acat);
    return this;
  }

  public withBlockedCategories(bcat: string[]): this {
    this.builder.withBlockedCategories(bcat);
    return this;
  }

  public withCategoryTaxonomy(cattax: number): this {
    this.builder.withCategoryTaxonomy(cattax);
    return this;
  }

  public withBlockedAdvertisers(badv: string[]): this {
    this.builder.withBlockedAdvertisers(badv);
    return this;
  }

  public withBlockedApps(bapp: string[]): this {
    this.builder.withBlockedApps(bapp);
    return this;
  }

  public withSource(source: SourceV26): this {
    this.builder.withSource(source);
    return this;
  }

  public withRegulations(regs: RegsV26): this {
    this.builder.withRegulations(regs);
    return this;
  }

  public withExt(ext: Record<string, unknown>): this {
    this.builder.withExt(ext);
    return this;
  }

  public withCommonImp(props: Partial<ImpV26>): this {
    this.builder.withCommonImp(props);
    return this;
  }

  public build(): BidRequestV26 {
    return this.builder.build();
  }
}
