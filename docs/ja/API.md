# API ドキュメント

## OpenRTB version 2.6

### BidRequestBuilder

OpenRTB 2.6 の入札リクエストオブジェクトを構築するためのビルダー。

#### インポート

```typescript
import { BidRequestBuilder } from "@nextad/builder/v26";
```

#### コンストラクタ

```typescript
const builder = new BidRequestBuilder();
```

#### メソッド

##### トップレベルパラメーター

- withId(id: string): 入札リクエストの ID を設定します (指定しない場合、自動的に uuid で生成された id が設定されます)
- withTimeout(tmax: number): 入札を受け付ける最大時間（ミリ秒）を設定します
- withTest(test: 0 | 1): テストモードフラグを設定します
- withAuctionType(at: number): オークションタイプを設定します
- withAllImps(allimps: 0 | 1): すべてのインプレッションフラグを設定します
- withCurrencies(cur: string[]): 使用可能な通貨を設定します
- withWhitelistedSeats(wseat: string[]): 許可するバイヤーシートのリストを設定します
- withBlockedSeats(bseat: string[]): ブロックするバイヤーシートのリストを設定します

##### オブジェクトパラメーター

- withSite(site: Partial<SiteV26>): サイトオブジェクトを設定します
- withApp(app: Partial<AppV26>): アプリオブジェクトを設定します
- withDOOH(dooh: Partial<DOOHV26>): DOOH オブジェクトを設定します
- withDevice(device: Partial<DeviceV26>): デバイスオブジェクトを設定します
- withUser(user: Partial<UserV26>): ユーザーオブジェクトを設定します
- withSource(source: Partial<SourceV26>): ソースオブジェクトを設定します
- withRegulations(regs: Partial<RegsV26>): 規制オブジェクトを設定します

##### インプレッション管理

- withCommonImp(props: Partial<ImpV26>): すべてのインプレッションに共通のプロパティを設定します
- addImp(props?: Partial<ImpV26>): 新しいインプレッションを追加します（プロパティはオプション）

##### ビルド

- build(): 最終的な BidRequest オブジェクトを返します

#### 使用例

```typescript
const request = new BidRequestBuilder()
  .withId("request-1")
  .withTimeout(500)
  .withSite({
    id: "site1",
    domain: "example.com",
  })
  .withCommonImp({
    secure: 1,
    bidfloor: 1.0,
    bidfloorcur: "USD",
  })
  .addImp({
    banner: {
      w: 300,
      h: 250,
    },
  })
  .build();
```

### BidRequestBuilderDecorator

#### インポート

```typescript
import { BidRequestBuilderDecorator } from "@nextad/builder/v26";
// ほとんどの場合、OpenRTB version 2.6の型定義も一緒にインポートします
// import { Imp } from 'iab-openrtb/v26';
```

#### 使用方法

基底デコレーターを継承することで特定の部分に集中して実装をすることが可能です。

```typescript
import { BidRequestBuilderDecorator } from "@nextad/builder/v26";
import { Imp } from "iab-openrtb/v26";

class DV360BidRequestDecorator extends BidRequestBuilderDecorator {
  public withExt(ext: Record<string, unknown>): this {
    return super.withExt({
      ...ext,
      google: {
        billing_id: "123456789",
        publisher_id: "pub-1234567890",
      },
    });
  }

  public addImp(props?: Partial<Imp>): this {
    return super.addImp({
      ...props,
      ext: {
        ...props?.ext,
        google: {
          slot_visibility: "ABOVE_THE_FOLD",
        },
      },
    });
  }
}

const dv360Builder = new DV360BidRequestDecorator(new BidRequestBuilder());
const dv360Request = dv360Builder
  .withId("request-1")
  .withSite({
    id: "site1",
    domain: "example.com",
  })
  .addImp({
    banner: {
      w: 300,
      h: 250,
    },
  })
  .build();
```

### BidResponseBuilder

OpenRTB 2.6 の入札レスポンスオブジェクトを構築するためのビルダー。

#### インポート

```typescript
import { BidResponseBuilder } from "@nextad/builder/v26";
```

#### コンストラクタ

```typescript
const builder = new BidResponseBuilder();
```

#### メソッド

##### トップレベルパラメーター

- withId(id: string): 入札レスポンスの ID を設定します (使用しない場合、自動的に uuid で生成された id が設定されます)
- withBidId(bidid: string): ビッダーが生成したレスポンス ID を設定します
- withCurrency(cur: string): 入札通貨を設定します
- withCustomData(customdata: string): クッキー用のカスタムデータを設定します
- withNoBidReason(nbr: number): 入札しない理由を設定します
- withExt(ext: Record<string, unknown>): 拡張データを設定します

##### シートビッド管理

- beginSeatBid(seat?: string): 新しいシートビッドセクションを開始します
- withGroup(group: 0 | 1): 現在のシートビッドにグループフラグを設定します
- withCommonBid(props: Partial<BidV26>): 現在のシートビッド内のすべての入札に共通のプロパティを設定します

##### 入札管理

- addBid(props: Partial<BidV26> & { impid: string; price: number }): 新しい入札を追加します
- addBannerBid(props: Partial<BidV26> & { impid: string; price: number }): バナー広告の入札を追加します
- addVideoBid(props: Partial<BidV26> & { impid: string; price: number }): 動画広告の入札を追加します
- addAudioBid(props: Partial<BidV26> & { impid: string; price: number }): オーディオ広告の入札を追加します
- addNativeBid(props: Partial<BidV26> & { impid: string; price: number }): ネイティブ広告の入札を追加します

##### ビルド

- build(): 最終的な BidResponse オブジェクトを返します。

#### 使用例

```typescript
const response = new BidResponseBuilder()
  .withId("response-1")
  .withCurrency("USD")
  .beginSeatBid("seat1")
  .withCommonBid({
    adomain: ["advertiser.com"],
    cat: ["IAB1"],
  })
  .addBannerBid("imp1", 3.5, "<creative>", {
    w: 300,
    h: 250,
  })
  .build();
```

### BidResponseBuilderDecorator

#### インポート

```typescript
import { BidResponseBuilderDecorator } from "@nextad/builder/v26";
// ほとんどの場合、OpenRTB version 2.6の型定義も一緒にインポートします
// import { Bid } from 'iab-openrtb/v26';
```

#### 使用方法

基底デコレーターを継承することで特定の部分に集中して実装をすることが可能です。

```typescript
import { BidResponseBuilderDecorator } from "@nextad/builder/v26";
import { Bid } from "iab-openrtb/v26";

class TTDBidResponseDecorator extends BidResponseBuilderDecorator {
  public addBid(
    props: Partial<BidV26> & { impid: string; price: number }
  ): this {
    return super.addBid({
      ...props,
      ext: {
        ...props.ext,
        ttd: {
          advertiser_id: "ttd-adv-123",
          campaign_id: "ttd-camp-456",
        },
      },
    });
  }
}

const ttdBuilder = new TTDBidResponseDecorator(new BidResponseBuilder());
const ttdResponse = ttdBuilder
  .withId("response-1")
  .withCurrency("USD")
  .beginSeatBid("ttd-seat")
  .addBannerBid({
    impid: "imp1",
    price: 3.5,
    adm: "<creative>",
  })
  .build();
```
