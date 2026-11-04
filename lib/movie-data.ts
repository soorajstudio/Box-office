export type MovieEntry = {
  name: string
  /** value stored in USD millions for movies, USD millions for franchises */
  val: number
}

export type CategoryKey = 'global' | 'indian' | 'malayalam' | 'franchises'

export type Category = {
  key: CategoryKey
  title: string
  tagline: string
  /** unit description shown under section */
  unit: string
  poster: string
  /** is this a franchise (lifetime brand) section */
  isFranchise?: boolean
  data: MovieEntry[]
}

export const categories: Category[] = [
  {
    key: 'global',
    title: 'Global Cinema',
    tagline: 'The highest-grossing films across worldwide box office.',
    unit: 'Worldwide theatrical gross',
    poster: '/posters/global-epic.png',
    data: [
      { name: 'Avatar', val: 2920 },
      { name: 'Avengers: Endgame', val: 2800 },
      { name: 'Avatar: The Way of Water', val: 2320 },
      { name: 'Titanic', val: 2260 },
      { name: 'Star Wars Ep VII', val: 2070 },
      { name: 'Avengers: Infinity War', val: 2050 },
      { name: 'Spider-Man: No Way Home', val: 1920 },
      { name: 'Inside Out 2', val: 1690 },
      { name: 'Jurassic World', val: 1670 },
      { name: 'The Lion King', val: 1660 },
      { name: 'The Avengers', val: 1520 },
      { name: 'Furious 7', val: 1510 },
      { name: 'Top Gun: Maverick', val: 1490 },
      { name: 'Frozen II', val: 1450 },
      { name: 'Barbie', val: 1440 },
      { name: 'Avengers: Age of Ultron', val: 1400 },
      { name: 'Super Mario Bros', val: 1360 },
      { name: 'Black Panther', val: 1350 },
      { name: 'Harry Potter 8', val: 1340 },
      { name: 'Star Wars Ep VIII', val: 1330 },
      { name: 'Jurassic World: Fallen Kingdom', val: 1310 },
      { name: 'Frozen', val: 1290 },
      { name: 'Beauty and the Beast', val: 1260 },
      { name: 'Incredibles 2', val: 1240 },
      { name: 'Fate of the Furious', val: 1230 },
    ],
  },
  {
    key: 'indian',
    title: 'Indian Cinema',
    tagline: 'Pan-India blockbusters dominating the national box office.',
    unit: 'Worldwide theatrical gross',
    poster: '/posters/indian-epic.png',
    data: [
      { name: 'Dangal', val: 247 },
      { name: 'Dhurandhar: The Revenge', val: 223 },
      { name: 'Baahubali 2', val: 218 },
      { name: 'Pushpa 2: The Rule', val: 198 },
      { name: 'Dhurandhar', val: 162 },
      { name: 'RRR', val: 160 },
      { name: 'K.G.F: Chapter 2', val: 150 },
      { name: 'Jawan', val: 140 },
      { name: 'Pathaan', val: 130 },
      { name: 'Kalki 2898 AD', val: 125 },
      { name: 'Animal', val: 110 },
      { name: 'Bajrangi Bhaijaan', val: 105 },
      { name: 'Stree 2', val: 105 },
      { name: 'Secret Superstar', val: 104 },
      { name: 'Kantara: Chapter 1', val: 102 },
      { name: 'Chhaava', val: 97 },
      { name: 'PK', val: 92 },
      { name: '2.0', val: 84 },
      { name: 'Gadar 2', val: 83 },
      { name: 'Sultan', val: 74 },
      { name: 'Salaar', val: 74 },
      { name: 'Jailer', val: 72 },
      { name: 'Sanju', val: 70 },
      { name: 'Saiyaara', val: 69 },
      { name: 'Padmaavat', val: 68 },
    ],
  },
  {
    key: 'malayalam',
    title: 'Malayalam Cinema',
    tagline: 'The new wave of Malayalam films breaking records.',
    unit: 'Worldwide theatrical gross',
    poster: '/posters/malayalam-epic.png',
    data: [
      { name: 'Lokah Chapter 1: Chandra', val: 36.6 },
      { name: 'L2: Empuraan', val: 32.1 },
      { name: 'Manjummel Boys', val: 29.1 },
      { name: 'Vaazha II', val: 28.2 },
      { name: 'Thudarum', val: 28.1 },
      { name: 'Drishyam 3', val: 27.9 },
      { name: '2018', val: 21.6 },
      { name: 'The Goat Life', val: 19.0 },
      { name: 'Aavesham', val: 18.7 },
      { name: 'Sarvam Maya', val: 18.1 },
      { name: 'Pulimurugan', val: 16.7 },
      { name: 'Premalu', val: 16.4 },
      { name: 'Lucifer', val: 15.5 },
      { name: 'Aadu 3', val: 14.4 },
      { name: 'Marco', val: 13.2 },
      { name: 'ARM', val: 12.8 },
      { name: 'Bheeshma Parvam', val: 11.0 },
      { name: 'Kurup', val: 10.0 },
      { name: 'Kayamkulam Kochunni', val: 9.0 },
      { name: 'Minnal Murali', val: 8.0 },
      { name: 'RDX', val: 7.5 },
      { name: 'Neru', val: 7.2 },
      { name: 'Kannur Squad', val: 7.0 },
      { name: 'Romancham', val: 6.8 },
      { name: 'Ennu Ninte Moideen', val: 6.5 },
    ],
  },
  {
    key: 'franchises',
    title: 'Media Franchises',
    tagline: 'The most valuable entertainment franchises of all time.',
    unit: 'Estimated total franchise revenue',
    poster: '/posters/franchise-epic.png',
    isFranchise: true,
    data: [
      { name: 'Pokémon', val: 115000 },
      { name: 'Mickey Mouse', val: 61000 },
      { name: 'Star Wars', val: 46000 },
      { name: 'Disney Princess', val: 45000 },
      { name: 'Anpanman', val: 38000 },
      { name: 'MCU', val: 35000 },
      { name: 'Winnie the Pooh', val: 34000 },
      { name: 'Harry Potter', val: 33000 },
      { name: 'Spider-Man', val: 32000 },
      { name: 'Batman', val: 29000 },
      { name: 'Dragon Ball', val: 27000 },
      { name: 'Call of Duty', val: 25000 },
      { name: 'Barbie', val: 24000 },
      { name: 'Hello Kitty', val: 22000 },
      { name: 'Toy Story', val: 21000 },
      { name: 'Cars', val: 19000 },
      { name: 'Lord of the Rings', val: 18000 },
      { name: 'Peanuts', val: 17000 },
      { name: 'Transformers', val: 16000 },
      { name: 'Gundam', val: 15000 },
      { name: 'One Piece', val: 14000 },
      { name: 'TMNT', val: 13000 },
      { name: 'James Bond', val: 12000 },
      { name: 'Super Mario', val: 11000 },
      { name: 'Frozen', val: 10000 },
    ],
  },
]

export const categoryByKey = Object.fromEntries(
  categories.map((c) => [c.key, c]),
) as Record<CategoryKey, Category>

export type Currency = 'USD' | 'INR'

const USD_TO_INR = 83 // 1 USD = 83 INR -> 1M USD = 8.3 Cr INR

/** Format a USD-millions value into a friendly currency string. */
export function formatMoney(valueInMillions: number, currency: Currency): string {
  if (currency === 'USD') {
    if (valueInMillions >= 1000)
      return `$${(valueInMillions / 1000).toFixed(2)}B`
    return `$${valueInMillions.toFixed(valueInMillions < 100 ? 1 : 0)}M`
  }
  const crores = valueInMillions * 8.3
  if (crores >= 100000)
    return `₹${(crores / 100000).toLocaleString('en-IN', { maximumFractionDigits: 2 })} L Cr`
  return `₹${crores.toLocaleString('en-IN', { maximumFractionDigits: 0 })} Cr`
}

export function getChartValue(valueInMillions: number, currency: Currency): number {
  return currency === 'USD' ? valueInMillions : valueInMillions * USD_TO_INR
}

export function getAxisLabel(currency: Currency): string {
  return currency === 'USD' ? 'Revenue (USD Millions)' : 'Revenue (INR Crores)'
}
