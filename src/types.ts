// Can't easily type an hexadecimal color in TypeScript, so we use a template literal type, better than nothing
export type HexColor = `#${string}`

export type Segment = {
  name: string;
  color?: HexColor; // It's only possible to use hexadecimal colors, to be compatible with HTML color input
}
