# @nextad/builder

A TypeScript-enabled builder library for constructing OpenRTB 2.6 bid requests and responses.

## Features

- 🛠️ Fluent builder pattern for OpenRTB 2.6 objects
- 🎯 Complete TypeScript type definitions support
- 🔄 Intuitive object constructing using method chaining
- 📝 Compliance with OpenRTB 2.6 specifications
- ⚡ Support for ESM and CommonJS
- 🔑 Automatic ID parameter generation using UUID

## Installation

npm:

```bash
npm install @nextad/builder iab-openrtb
```

pnpm:

```bash
pnpm add @nextad/builder iab-openrtb
```

## Usage

### Basic Usage

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

### Constructing a Bid Request

```typescript
const builder = new BidRequestBuilder()
  .withId("request-id")
  .withTimeout(500)
  .withCurrency(["USD"])
  .withSite({
    id: "site1",
    domain: "example.com",
  });

// Add an impression
builder.addImp({
  banner: {
    w: 300,
    h: 250,
  },
});

const request = builder.build();
```

### Constructing a Bid Response

```typescript
const builder = new BidResponseBuilder()
  .withId("response-id")
  .withCurrency("USD")
  .withBidId("bid-1");

// Add a seat bid and its bid
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

## API Documents

For detailed API documentation, please refer to [API.md](./API.md).

## Dependencies

- [iab-openrtb](https://github.com/hogekai/types-iab-openrtb): OpenRTB Type definitions
- [uuid](https://www.npmjs.com/package/uuid): uuid generation

## License

[MIT License](LICENCE)