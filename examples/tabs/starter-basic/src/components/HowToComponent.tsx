import { H1, H3 } from "@blueprintjs/core"
import * as React from "react"
export const HowToComponent = () => {
  return (
    <div>
      <H1>Welcome to your new Misk-Web tab!</H1>
      <p>
        Take a look around! There are some{" "}
        <a href="https://cashapp.github.io/misk-web/docs/guides/building-a-tab/05-pure-vs-connected">
          pure components and connected containers
        </a>
        , examples of form fields, and network requests.
      </p>
      <p>
        For larger examples, check out the{" "}
        <a href="https://github.com/cashapp/misk-web/tree/master/examples/tabs/palette-exemplar">
          palette-exemplar tab in Misk-Web repo
        </a>
        , or play around with the palette-exemplar demo in the{" "}
        <a href="https://cashapp.github.io/misk-web/docs/examples/palette-exemplar">
          docs
        </a>
        .
      </p>
      <H3>
        Good luck building on Misk-Web! See the{" "}
        <a href="https://cashapp.github.io/misk-web/">docs</a> or{" "}
        <a href="https://github.com/cashapp/misk-web">repo</a> to learn more.
      </H3>
    </div>
  )
}

export default HowToComponent
