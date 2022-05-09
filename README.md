# Solana React Metaplex AuctionHouse UI test

ALREADY IN DEVELOPMENT

Not all function works correctly

This is a simple UI app with TypeScript and Solana wallet connection through wallet-adapter to integrate CLI Metaplex AuctionHouse

Includes:

- Typescript
- CRA
- Solana wallet adapter


## Install package

```
yarn install
```

Metaplex dependencies

```
cd src/api

yarn install
```

## Run

```
yarn start
```

or

```
npm run start
```

import function on .tsx

```
import { show, create_auction_house, sell, buy, execute_sale } from './api/src/auction-house'
```


## Missing:

Create Sign Transaction, Wallet connection integration

