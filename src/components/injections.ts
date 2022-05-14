import { parse } from "svgson"

import {
  copyAndAppend,
  InvalidSourceImageError,
  read,
  toBase64,
  write
} from "../support"
import { useTemplate } from "./template"

export interface ImageOptions {
  codeSrc: string
  imageSrc: string
  imageDst: string
}

const ensureFileType = (path: string, ext: string): void => {
  if (!path.endsWith(ext)) {
    throw new InvalidSourceImageError(path)
  }
}

export const injectPayload = async ({
  codeSrc,
  imageSrc,
  imageDst
}: ImageOptions): Promise<void> => {
  ensureFileType(imageSrc, ".png")

  const base64Code: string = toBase64(await read(codeSrc))

  console.debug(`Writing base64 payload code to png.`, {
    path: imageDst,
    base64Code
  })

  await copyAndAppend(imageSrc, imageDst, ["\n;", base64Code].join(""))
}

export const injectLoader = async ({
  codeSrc,
  imageSrc,
  imageDst
}: ImageOptions): Promise<void> => {
  ensureFileType(imageSrc, ".svg")

  const [imageContent, codeContent] = await Promise.all([
    read(imageSrc),
    read(codeSrc)
  ])

  const { attributes, children } = await parse(imageContent)
  const viewBox: string[] = attributes.viewBox.split(" ")
  const base64Code: string = toBase64(codeContent)

  const template: string = useTemplate({
    viewBox,
    children,
    base64Code
  })

  console.debug(`Writing base64 loader code to svg.`, {
    path: imageDst,
    base64Code
  })

  await write(imageDst, template)
}
