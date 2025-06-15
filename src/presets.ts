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
