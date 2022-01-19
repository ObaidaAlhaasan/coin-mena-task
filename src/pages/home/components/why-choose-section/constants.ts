export interface IChooseReason {
  iconPath: string;
  firstParg: string;
  secondParg: string;
  description: string;
}

export const chooseReasons = [
  {
    iconPath: "/assets/svgs/why-choose/trust.svg",
    firstParg: "BEST USER EXPERIENCE",
    secondParg: "Easy & Simple to use interface",
    description: "Navigate through our platform with ease. Your trading experience just got better with Tokenize" +
      " Exchange’s" +
      " easy & simple to use platform."
  },
  {
    iconPath: "/assets/svgs/why-choose/fiat-gateway.svg",
    firstParg: "FIAT GATEWAY",
    secondParg: "The bridge that connects fiat to cryptocurrencies",
    description: "A trusted platform with intuitive UI/UX allowing users to connect fiat and cryptocurrencies" +
      " conveniently."
  },
  {
    iconPath: "/assets/svgs/why-choose/bonded-comunity.svg",
    firstParg: "BONDED COMMUNITY",
    secondParg: "Sharing of knowledge, ideas & values",
    description: "Explore and discuss about the various blockchain innovations in our Token Store online. Workshops" +
      " will" +
      " also" +
      " be conducted to educate new users."
  },
  {
    iconPath: "/assets/svgs/why-choose/variety.svg",
    firstParg: "VARIETY",
    secondParg: "All in 1 Platform",
    description: "Get access to established & emerging cryptocurrencies with our platform. Tokenize Exchange supports" +
      " fiat-crypto pairings, crypto-crypto pairings & ICO (IEO)."
  },
  {
    iconPath: "/assets/svgs/why-choose/protection.svg",
    firstParg: "ALL-ROUNDED PROTECTION",
    secondParg: "Top-notch Security",
    description: "IP whitelisting & 2-Factor authentication available for extra security and hybrid wallet mechanism" +
      " with" +
      " multi-signature strategy for stronger asset protection."
  },
  {
    iconPath: "/assets/svgs/why-choose/competitive-rates.svg",
    firstParg: "COMPETITIVE RATES",
    secondParg: "Benefits upon benefits",
    description: "Use our Tokenize Xchange emblem, TKX, to enjoy discounts on your trading fees,for as low as 0.1%" +
      " for" +
      " Platinum users."
  }
] as IChooseReason[];
