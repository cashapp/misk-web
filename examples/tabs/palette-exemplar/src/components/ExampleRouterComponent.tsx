import { Button, ControlGroup, Intent, H1, H3 } from "@blueprintjs/core"
import { IconNames } from "@blueprintjs/icons"
import * as React from "react"
import { Link, useParams, useNavigate, useLocation } from "react-router-dom"
import { CodePreContainer } from "@misk/core"

const LinkComponent = () => {
  const params = useParams()
  if (params.first) {
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

export const ExampleRouterComponent = () => {
  const params = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div>
      <H1>{"Router Path Parameters"}</H1>
      Learn more about these props injected by{" "}
      <a href={"https://reacttraining.com/react-router/web/api/location"}>
        React Router here
      </a>
      <H3>Location</H3>
      <CodePreContainer>{JSON.stringify(location)}</CodePreContainer>
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
          onClick={() => {
            navigate(-1)
          }}
        ></Button>
        <LinkComponent />
        <Button intent={Intent.PRIMARY} text={params.first || "none"} />
        <Button intent={Intent.PRIMARY} text={params.second || "none"} />
      </ControlGroup>
      <CodePreContainer>{JSON.stringify(params)}</CodePreContainer>
    </div>
  )
}

export default ExampleRouterComponent
