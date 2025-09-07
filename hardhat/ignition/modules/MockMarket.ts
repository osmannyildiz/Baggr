import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("MockMarketModule", (m) => {
  const usdt = m.contract("MockToken", ["USDT"], { id: "MockTokenUSDT" });
  const bnb = m.contract("MockToken", ["BNB"], { id: "MockTokenBNB" });
  const wbtc = m.contract("MockToken", ["WBTC"], { id: "MockTokenWBTC" });
  const link = m.contract("MockToken", ["LINK"], { id: "MockTokenLINK" });
  const matic = m.contract("MockToken", ["MATIC"], { id: "MockTokenMATIC" });
  const uni = m.contract("MockToken", ["UNI"], { id: "MockTokenUNI" });
  const cake = m.contract("MockToken", ["CAKE"], { id: "MockTokenCAKE" });
  const bio = m.contract("MockToken", ["BIO"], { id: "MockTokenBIO" });
  const doge = m.contract("MockToken", ["DOGE"], { id: "MockTokenDOGE" });
  const shib = m.contract("MockToken", ["SHIB"], { id: "MockTokenSHIB" });
  const pepe = m.contract("MockToken", ["PEPE"], { id: "MockTokenPEPE" });
  const floki = m.contract("MockToken", ["FLOKI"], { id: "MockTokenFLOKI" });
  const kekius = m.contract("MockToken", ["KEKIUS"], { id: "MockTokenKEKIUS" });

  const market = m.contract("MockMarket");

  m.call(market, "setTokenPrice", [usdt, 6e15], {
    id: "MockMarketSetTokenPriceUSDT",
  });
  m.call(market, "setTokenPrice", [bnb, 5e15], {
    id: "MockMarketSetTokenPriceBNB",
  });
  m.call(market, "setTokenPrice", [wbtc, 4e15], {
    id: "MockMarketSetTokenPriceWBTC",
  });
  m.call(market, "setTokenPrice", [link, 5e15], {
    id: "MockMarketSetTokenPriceLINK",
  });
  m.call(market, "setTokenPrice", [matic, 6e15], {
    id: "MockMarketSetTokenPriceMATIC",
  });
  m.call(market, "setTokenPrice", [uni, 5e15], {
    id: "MockMarketSetTokenPriceUNI",
  });
  m.call(market, "setTokenPrice", [cake, 4e15], {
    id: "MockMarketSetTokenPriceCAKE",
  });
  m.call(market, "setTokenPrice", [bio, 3e15], {
    id: "MockMarketSetTokenPriceBIO",
  });
  m.call(market, "setTokenPrice", [doge, 2e15], {
    id: "MockMarketSetTokenPriceDOGE",
  });
  m.call(market, "setTokenPrice", [shib, 1e15], {
    id: "MockMarketSetTokenPriceSHIB",
  });
  m.call(market, "setTokenPrice", [pepe, 2e15], {
    id: "MockMarketSetTokenPricePEPE",
  });
  m.call(market, "setTokenPrice", [floki, 1e15], {
    id: "MockMarketSetTokenPriceFLOKI",
  });
  m.call(market, "setTokenPrice", [kekius, 2e15], {
    id: "MockMarketSetTokenPriceKEKIUS",
  });

  return {
    market,
    usdt,
    bnb,
    wbtc,
    link,
    matic,
    uni,
    cake,
    bio,
    doge,
    shib,
    pepe,
    floki,
    kekius,
  };
});
