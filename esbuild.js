module.exports = require("esbuild").build({
  bundle: true,
  entryPoints: [ "src/build/payload.ts", "src/build/loader.ts" ],
  format: "iife",
  metafile: false,
  outdir: "temp",
  minify: true,
  platform: "browser",
  target: "es6",
  splitting: false,
  sourcemap: false,
})
