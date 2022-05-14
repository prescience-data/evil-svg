export class FileNotFoundError extends Error {
  public constructor(path: string) {
    super(
      `Unable to locate file "${path}". Ensure build step has occurred before obfuscating.`
    )
  }
}

export class InvalidSourceImageError extends Error {
  public constructor(path: string) {
    super(
      `Source image file "${path}" has an invalid extension. Image should be a "gif" file.`
    )
  }
}
