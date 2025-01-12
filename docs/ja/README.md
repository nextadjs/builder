# @nextad/builder

OpenRTB 2.6 の入札リクエストとレスポンスを構築するための TypeScript 対応ビルダーライブラリ。

## 特徴

- 🛠️ OpenRTB 2.6 オブジェクトのための Fluent ビルダーパターン
- 🎯 完全な TypeScript 型定義のサポート
- 🔄 メソッドチェーンによる直感的なオブジェクト構築
- 📝 OpenRTB 2.6 仕様準拠
- ⚡ ESM と CommonJS のサポート
- 🔑 UUID を使用した ID パラメーターの自動生成

## インストール

npm:

```bash
npm install @nextad/builder iab-openrtb
```

pnpm:

```bash
pnpm add @nextad/builder iab-openrtb
```

## 使い方

### 基本的な使い方

```typescript
import { BidRequestBuilder } from "@nextad/builder/v26";

const bidRequest = new BidRequestBuilder()
  .withTimeout(500)
  .addImp({ id: "imp1", banner: { w: 300, h: 250 } })
  .build();
```

```typescript
import { BidResponseBuilder } from "@nextad/builder/v26";

const bidResponse = new BidResponseBuilder()
  .beginSeatBid("seat1")
  .addBannerBid({
    adm: "<creative>",
    impid: "imp-id",
    price: 2.0,
  })
  .build();
```

### 入札リクエストの構築

```typescript
const builder = new BidRequestBuilder()
  .withId("request-id")
  .withTimeout(500)
  .withCurrency(["USD"])
  .withSite({
    id: "site1",
    domain: "example.com",
  });

// インプレッションの追加
builder.addImp({
  banner: {
    w: 300,
    h: 250,
  },
});

const request = builder.build();
```

### 入札レスポンスの構築

```typescript
const builder = new BidResponseBuilder()
  .withId("response-id")
  .withCurrency("USD")
  .withBidId("bid-1");

// シートビッドと入札の追加
builder
  .beginSeatBid("seat1")
  .withCommonBid({
    adomain: ["advertiser.com"],
    cat: ["IAB1"],
  })
  .addBannerBid({
    adm: "<creative>",
    impid: "imp-id",
    price: 2.0,
  })
  .addVideoBid({
    adm: "<VAST>",
    impid: "imp-id",
    price: 2.0,
  });

const response = builder.build();
```

## API ドキュメント

詳細な API ドキュメントは[API.md](./API.md)を参照してください。

## インポート方法

```typescript
// OpenRTB 2.6ビルダーのインポート
import { BidRequestBuilder, BidResponseBuilder } from "@nextad/builder/v26";
```

## 依存パッケージ

- [iab-openrtb](https://github.com/hogekai/types-iab-openrtb): OpenRTB 型定義
- [uuid](https://www.npmjs.com/package/uuid): uuid 生成

## ライセンス

[MIT License](../LICENCE)
