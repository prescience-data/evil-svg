export const toBase64 = (value: string): string =>
  Buffer.from(value).toString("base64")
