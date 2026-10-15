export type Client = { name: string; logo: string };

const FIRST_LOGO = 2;
const LAST_LOGO = 40;

export const clients: Client[] = Array.from(
  { length: LAST_LOGO - FIRST_LOGO + 1 },
  (_, i) => ({
    name: "Logo cliente",
    logo: `image${FIRST_LOGO + i}.png`,
  }),
);
