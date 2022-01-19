interface IFooterItem {
  label: string;
  items: string[];
}

export const FooterItems: IFooterItem[] = [
  {
    label: 'TOKENIZE EXCHANGE',
    items: ['Markets', 'Token Store', 'OTC']
  },
  {
    label: 'HELP',
    items: ['FAQ', 'Privacy Policy', 'T&Cs', 'Risks Warning']
  }
]


interface ISocialLink {
  name: string
}

export const SocialLinks: ISocialLink[] = [
  {name: "twitter"},
  {name: "facebook"},
  {name: "linkedin-in"},
  {name: "google"},
  {name: "instagram"},
  {name: "telegram"},
  {name: "snapchat"},
  {name: "medium"},
];

