import { INode, stringify } from "svgson"

export const clean = (value: string): string =>
  value.replace(/\s\s+/gm, " ").trim()

export const flatten = (children: INode[]): string =>
  children.map((child) => stringify(child, { selfClose: true })).join("")
