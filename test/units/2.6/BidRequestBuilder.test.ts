import { BidRequestBuilder } from "@/2.6/BidRequestBuilder";

describe("Bid Request Builder Behavior", () => {
  it.each([
    {
      method: "withId",
      value: "test-id",
      expectedKey: "id",
      expectedValue: "test-id",
    },
    {
      method: "withTest",
      value: 1,
      expectedKey: "test",
      expectedValue: 1,
    },
    {
      method: "withAuctionType",
      value: 2,
      expectedKey: "at",
      expectedValue: 2,
    },
    {
      method: "withTimeout",
      value: 500,
      expectedKey: "tmax",
      expectedValue: 500,
    },
    {
      method: "withWhitelistedSeats",
      value: ["seat1", "seat2"],
      expectedKey: "wseat",
      expectedValue: ["seat1", "seat2"],
    },
    {
      method: "withBlockedSeats",
      value: ["blocked1", "blocked2"],
      expectedKey: "bseat",
      expectedValue: ["blocked1", "blocked2"],
    },
    {
      method: "withAllImps",
      value: 1,
      expectedKey: "allimps",
      expectedValue: 1,
    },
    {
      method: "withCurrencies",
      value: ["USD", "EUR"],
      expectedKey: "cur",
      expectedValue: ["USD", "EUR"],
    },
    {
      method: "withLanguages",
      value: ["en", "ja"],
      expectedKey: "wlang",
      expectedValue: ["en", "ja"],
    },
    {
      method: "withLanguagesBCP47",
      value: ["en-US", "ja-JP"],
      expectedKey: "wlangb",
      expectedValue: ["en-US", "ja-JP"],
    },
    {
      method: "withAllowedCategories",
      value: ["IAB1", "IAB2"],
      expectedKey: "acat",
      expectedValue: ["IAB1", "IAB2"],
    },
    {
      method: "withBlockedCategories",
      value: ["IAB3", "IAB4"],
      expectedKey: "bcat",
      expectedValue: ["IAB3", "IAB4"],
    },
    {
      method: "withCategoryTaxonomy",
      value: 2,
      expectedKey: "cattax",
      expectedValue: 2,
    },
    {
      method: "withBlockedAdvertisers",
      value: ["badv1.com", "badv2.com"],
      expectedKey: "badv",
      expectedValue: ["badv1.com", "badv2.com"],
    },
    {
      method: "withBlockedApps",
      value: ["com.blocked.app1", "com.blocked.app2"],
      expectedKey: "bapp",
      expectedValue: ["com.blocked.app1", "com.blocked.app2"],
    },
    {
      method: "withExt",
      value: { custom: "value" },
      expectedKey: "ext",
      expectedValue: { custom: "value" },
    },
  ])(
    "$method で指定した値 $value が $expectedKey に設定される",
    ({ method, value, expectedKey, expectedValue }) => {
      const sut = new BidRequestBuilder() as any;

      const result = sut[method](value).build();

      expect(result[expectedKey]).toEqual(expectedValue);
    }
  );

  it.each([
    {
      name: "Site オブジェクト",
      method: "withSite",
      value: { id: "site1", name: "Test Site" },
      expectedKey: "site",
    },
    {
      name: "App オブジェクト",
      method: "withApp",
      value: { id: "app1", name: "Test App" },
      expectedKey: "app",
    },
    {
      name: "DOOH オブジェクト",
      method: "withDOOH",
      value: { id: "dooh1", venue: { name: "Test Venue" } },
      expectedKey: "dooh",
    },
    {
      name: "Device オブジェクト",
      method: "withDevice",
      value: { ua: "test-ua", ip: "192.168.1.1" },
      expectedKey: "device",
    },
    {
      name: "User オブジェクト",
      method: "withUser",
      value: { id: "user1", buyeruid: "buyer1" },
      expectedKey: "user",
    },
    {
      name: "Source オブジェクト",
      method: "withSource",
      value: { fd: 1, tid: "test-tid" },
      expectedKey: "source",
    },
    {
      name: "Regulations オブジェクト",
      method: "withRegulations",
      value: { coppa: 1, gdpr: 1 },
      expectedKey: "regs",
    },
  ])("$name を with メソッドで設定する", ({ method, value, expectedKey }) => {
    const sut = new BidRequestBuilder() as any;

    const result = sut[method](value).build();

    expect(result[expectedKey]).toEqual(value);
  });

  describe("withメソッドの上書き動作", () => {
    it.each([
      {
        method: "withSite",
        initialValue: { id: "site1", name: "Site 1" },
        newValue: { name: "Updated Site", publisher: { id: "pub1" } },
        expectedValue: {
          id: "site1",
          name: "Updated Site",
          publisher: { id: "pub1" },
        },
      },
      {
        method: "withApp",
        initialValue: { id: "app1", name: "App 1" },
        newValue: { name: "Updated App", publisher: { id: "pub1" } },
        expectedValue: {
          id: "app1",
          name: "Updated App",
          publisher: { id: "pub1" },
        },
      },
      {
        method: "withDevice",
        initialValue: { ua: "ua1", ip: "1.1.1.1" },
        newValue: { ip: "2.2.2.2", geo: { country: "US" } },
        expectedValue: { ua: "ua1", ip: "2.2.2.2", geo: { country: "US" } },
      },
      {
        method: "withUser",
        initialValue: { id: "user1", buyeruid: "buyer1" },
        newValue: { buyeruid: "buyer2", geo: { country: "US" } },
        expectedValue: {
          id: "user1",
          buyeruid: "buyer2",
          geo: { country: "US" },
        },
      },
      {
        method: "withExt",
        initialValue: { nextad: "ext" },
        newValue: { js: true },
        expectedValue: { nextad: "ext", js: true },
      },
    ])(
      "$method は既存の値を保持しながら新しい値で上書きする",
      ({ method, initialValue, newValue, expectedValue }) => {
        const sut = (new BidRequestBuilder() as any)
          .addImp()
          [method](initialValue)
          [method](newValue);

        const result = sut.build();
        console.log(result);
        expect(result[method.slice(4).toLowerCase()]).toEqual(expectedValue);
      }
    );
  });

  describe("imp の振る舞い", () => {
    it("追加メソッド で imp が追加される", () => {
      const builder = new BidRequestBuilder().addImp().addImp().addImp();

      const result = builder.build();
      expect(result.imp).toHaveLength(3);
      expect(result.imp[0].id).toBeDefined();
      expect(result.imp[1].id).toBeDefined();
      expect(result.imp[2].id).toBeDefined();
    });

    it("imp の id は UUID 形式", () => {
      const builder = new BidRequestBuilder().addImp();
      const result = builder.build();

      expect(result.imp[0].id).toMatch(
        /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
      );
    });

    describe("共通imp設定", () => {
      it("withCommonImpで設定した値が全てのimpに適用される", () => {
        const builder = new BidRequestBuilder()
          .withCommonImp({
            bidfloor: 1.0,
            bidfloorcur: "USD",
          })
          .addImp()
          .addImp();

        const result = builder.build();

        expect(result.imp).toHaveLength(2);
        expect(result.imp[0].bidfloor).toBe(1.0);
        expect(result.imp[0].bidfloorcur).toBe("USD");
        expect(result.imp[1].bidfloor).toBe(1.0);
        expect(result.imp[1].bidfloorcur).toBe("USD");
      });

      it("withCommonImpは既存のimpにも遡って適用される", () => {
        const builder = new BidRequestBuilder()
          .addImp()
          .addImp()
          .withCommonImp({ bidfloor: 1.0 });

        const result = builder.build();

        expect(result.imp[0].bidfloor).toBe(1.0);
        expect(result.imp[1].bidfloor).toBe(1.0);
      });

      it("withCommonImpで設定した後にaddImpで個別の値を上書きできる", () => {
        const builder = new BidRequestBuilder()
          .withCommonImp({ bidfloor: 1.0 })
          .addImp()
          .addImp({ bidfloor: 2.0 });

        const result = builder.build();

        expect(result.imp[0].bidfloor).toBe(1.0);
        expect(result.imp[1].bidfloor).toBe(2.0);
      });

      it("withCommonImpを複数回呼び出すと値がマージされる", () => {
        const builder = new BidRequestBuilder()
          .withCommonImp({ bidfloor: 1.0 })
          .withCommonImp({ bidfloorcur: "USD" })
          .addImp();

        const result = builder.build();

        expect(result.imp[0].bidfloor).toBe(1.0);
        expect(result.imp[0].bidfloorcur).toBe("USD");
      });

      it("メディアタイプ（banner/video/native）の設定が正しくマージされる", () => {
        const builder = new BidRequestBuilder()
          .withCommonImp({
            banner: { w: 300, h: 250 },
          })
          .withCommonImp({
            banner: { pos: 1 },
          })
          .addImp();

        const result = builder.build();

        expect(result.imp[0].banner).toEqual({
          w: 300,
          h: 250,
          pos: 1,
        });
      });
    });
  });
});