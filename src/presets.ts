import type { Segment } from "./types"

export const fibonacci = [
  { name: "0" },
  { name: "1" },
  { name: "2" },
  { name: "3" },
  { name: "5" },
  { name: "8" },
  { name: "13" },
  { name: "20" },
  { name: "☕" },
  { name: "❓" },
] as const satisfies Segment[]

export const tshirts = [
  { name: "XS" },
  { name: "S" },
  { name: "M" },
  { name: "L" },
  { name: "XL" },
] as const satisfies Segment[]

export const yesNoMaybe = [
  { name: "Yes" },
  { name: "No" },
  { name: "Maybe" },
] as const satisfies Segment[]

export const dice = [
  { name: "1" },
  { name: "2" },
  { name: "3" },
  { name: "4" },
  { name: "5" },
  { name: "6" },
] as const satisfies Segment[]

export const nightActivity = [
  { name: "📺 TV show" },
  { name: "🎥 Movie" },
  { name: "🎮 Video game" },
  { name: "♟️ Board game" },
  { name: "📖 Book" },
  { name: "💤 Sleep" },
] as const satisfies Segment[]

export const lunch = [
  { name: "🍕 Pizza" },
  { name: "🥗 Salad" },
  { name: "🥫 Soup" },
  { name: "🍔 Burger" },
  { name: "🌯 Burrito" },
  { name: "🍣 Shushi" },
  { name: "🍝 Pasta" },
] as const satisfies Segment[]
