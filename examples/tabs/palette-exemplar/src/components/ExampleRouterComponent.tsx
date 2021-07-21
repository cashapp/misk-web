import { Button, ControlGroup, Intent, H1, H3 } from "@blueprintjs/core"
import { IconNames } from "@blueprintjs/icons"
import { IRouterProvidedProps } from "@misk/simpleredux"
import * as React from "react"
import { Link } from "react-router-dom"
import { CodePreContainer } from "@misk/core"

const LinkComponent = (props: IRouterProvidedProps) => {
  if (props.match) {
    return (
      <Link to={"/path/param/alpha/bravo"}>
        <Button text={"Test Path Parmeter"} />
      </Link>
    )
  } else {
    return (
      // <a href={"/path/param/alpha/bravo"}>
      <Button disabled={true} text={"Test Path Parmeter"} />
      // </a>
    )
  }
}

export const ExampleRouterComponent = (props: IRouterProvidedProps) => (
  <div>
    <H1>{"Router Path Parameters"}</H1>
    Learn more about these props injected by{" "}
    <a href={"https://reacttraining.com/react-router/web/api/location"}>
      React Router here
    </a>
    .<H3>History</H3>
    <CodePreContainer>{JSON.stringify(props.history)}</CodePreContainer>
    <H3>Location</H3>
    <CodePreContainer>{JSON.stringify(props.location)}</CodePreContainer>
    <H3>Match</H3>
    <p>
      This example uses the following route configuration to show how path
      parameters can be easily parsed out within a component.
    </p>
    <CodePreContainer>{`
      <Switch>
        <Route path="/path/param/:first/:second/" component={TabContainer} />
        ...
      </Switch>
    `}</CodePreContainer>
    <p>
      Clicking Test Path Parameter below changes the url path to
      "/path/param/alpha/bravo". The blue buttons will then change from saying
      "none" to "alpha" and "bravo" respectively.
    </p>
    <ControlGroup>
      <Button
        icon={IconNames.RESET}
        onClick={(props.history && props.history.goBack) || null}
      ></Button>
      <LinkComponent {...props} />
      <Button
        intent={Intent.PRIMARY}
        text={(props.match && (props.match.params as any).first) || "none"}
      />
      <Button
        intent={Intent.PRIMARY}
        text={(props.match && (props.match.params as any).second) || "none"}
      />
    </ControlGroup>
    <CodePreContainer>{JSON.stringify(props.match)}</CodePreContainer>
  </div>
)

export default ExampleRouterComponent
