import { uuid } from "@/libraries/uuid";
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
 * Builder for creating OpenRTB 2.6 BidRequest objects
 */
export class BidRequestBuilder {
  private request: Partial<BidRequestV26>;
  private currentImp: Partial<ImpV26> | null = null;
  private commonImpProps: Partial<ImpV26> = {};

  constructor() {
    this.request = {
      id: uuid(),
      imp: [],
    };
  }

  /**
   * Sets the ID of the bid request
   */
  withId(id: string): this {
    this.request.id = id;
    return this;
  }

  /**
   * Adds an impression to the bid request
   */
  addImp(props: Partial<ImpV26> = {}): this {
    const newImp: ImpV26 = {
      id: uuid(),
      ...props,
    };

    if (!this.request.imp) {
      this.request.imp = [];
    }
    this.request.imp.push(newImp);
    this.currentImp = newImp;
    return this;
  }

  /**
   * Sets the site object
   */
  withSite(site: Partial<SiteV26>): this {
    this.request.site = {
      ...this.request.site,
      ...site,
    };
    return this;
  }

  /**
   * Sets the app object
   */
  withApp(app: Partial<AppV26>): this {
    this.request.app = {
      ...this.request.app,
      ...app,
    };
    return this;
  }

  /**
   * Sets the DOOH object
   */
  withDOOH(dooh: Partial<DOOHV26>): this {
    this.request.dooh = {
      ...this.request.dooh,
      ...dooh,
    };
    return this;
  }

  /**
   * Sets the device object
   */
  withDevice(device: Partial<DeviceV26>): this {
    this.request.device = {
      ...this.request.device,
      ...device,
    };
    return this;
  }

  /**
   * Sets the user object
   */
  withUser(user: Partial<UserV26>): this {
    this.request.user = {
      ...this.request.user,
      ...user,
    };
    return this;
  }

  /**
   * Sets the test mode flag
   */
  withTest(test: 0 | 1): this {
    this.request.test = test;
    return this;
  }

  /**
   * Sets the auction type
   */
  withAuctionType(at: number): this {
    this.request.at = at;
    return this;
  }

  /**
   * Sets the maximum time in milliseconds for receiving bids
   */
  withTimeout(tmax: number): this {
    this.request.tmax = tmax;
    return this;
  }

  /**
   * Sets the allowed list of buyer seats
   */
  withWhitelistedSeats(wseat: string[]): this {
    this.request.wseat = wseat;
    return this;
  }

  /**
   * Sets the block list of buyer seats
   */
  withBlockedSeats(bseat: string[]): this {
    this.request.bseat = bseat;
    return this;
  }

  /**
   * Sets the all impressions flag
   */
  withAllImps(allimps: 0 | 1): this {
    this.request.allimps = allimps;
    return this;
  }

  /**
   * Sets the allowed currencies
   */
  withCurrencies(cur: string[]): this {
    this.request.cur = cur;
    return this;
  }

  /**
   * Sets the allowed languages using ISO-639-1-alpha-2
   */
  withLanguages(wlang: string[]): this {
    this.request.wlang = wlang;
    return this;
  }

  /**
   * Sets the allowed languages using IETF BCP 47
   */
  withLanguagesBCP47(wlangb: string[]): this {
    this.request.wlangb = wlangb;
    return this;
  }

  /**
   * Sets the allowed advertiser categories
   */
  withAllowedCategories(acat: string[]): this {
    this.request.acat = acat;
    return this;
  }

  /**
   * Sets the blocked advertiser categories
   */
  withBlockedCategories(bcat: string[]): this {
    this.request.bcat = bcat;
    return this;
  }

  /**
   * Sets the category taxonomy
   */
  withCategoryTaxonomy(cattax: number): this {
    this.request.cattax = cattax;
    return this;
  }

  /**
   * Sets the blocked advertiser domains
   */
  withBlockedAdvertisers(badv: string[]): this {
    this.request.badv = badv;
    return this;
  }

  /**
   * Sets the blocked applications
   */
  withBlockedApps(bapp: string[]): this {
    this.request.bapp = bapp;
    return this;
  }

  /**
   * Sets the source object
   */
  withSource(source: SourceV26): this {
    this.request.source = source;
    return this;
  }

  /**
   * Sets the regulations object
   */
  withRegulations(regs: RegsV26): this {
    this.request.regs = regs;
    return this;
  }

  /**
   * Sets extension data
   */
  withExt(ext: Record<string, unknown>): this {
    this.request.ext = {
      ...this.request.ext,
      ...ext,
    };
    return this;
  }

  /**
   * Sets common properties for all impressions
   */
  withCommonImp(props: Partial<ImpV26>): this {
    this.commonImpProps = {
      ...this.commonImpProps,
      ...props,
      ...(props.banner && {
        banner: { ...this.commonImpProps.banner, ...props.banner },
      }),
      ...(props.video && {
        video: { ...this.commonImpProps.video, ...props.video },
      }),
      ...(props.native && {
        native: { ...this.commonImpProps.native, ...props.native },
      }),
    };

    return this;
  }

  /**
   * Builds and returns the final BidRequest object
   */
  build(): BidRequestV26 {
    return (this.request = {
      ...this.request,
      imp: (this.request.imp || []).map((imp) => ({
        ...this.commonImpProps,
        ...imp,
      })),
    } as BidRequestV26);
  }
}
