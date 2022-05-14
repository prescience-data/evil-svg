import {
  appendFile,
  copyFile,
  ensureDir,
  pathExists,
  readFile,
  writeFile
} from "fs-extra"
import { parse, resolve } from "node:path"

import { FileNotFoundError } from "./exceptions"

export const toPath = (file: string): string => resolve(process.cwd(), file)

export const toDir = (file: string): string => parse(toPath(file)).dir

export const read = async (file: string): Promise<string> => {
  const path: string = toPath(file)

  if (!(await pathExists(path))) {
    throw new FileNotFoundError(path)
  }

  const content: Buffer = await readFile(path)

  return content.toString("utf-8")
}

export const write = async (file: string, content: string): Promise<void> => {
  const path: string = toPath(file)
  const { dir } = parse(path)
  await ensureDir(dir)
  await writeFile(path, content)
}

export const copyAndAppend = async (
  src: string,
  dst: string,
  content: string
): Promise<void> => {
  const srcPath: string = toPath(src)
  const dstPath: string = toPath(dst)

  if (!(await pathExists(srcPath))) {
    throw new FileNotFoundError(srcPath)
  }

  const { dir } = parse(dstPath)
  await ensureDir(dir)

  await copyFile(srcPath, dstPath)

  await appendFile(dstPath, content)
}
