import * as React from "react"

export const Heading = (props: { data: any }) => {
  const { data } = props
  return (
    <thead>
      <tr>
        <th key={"index"}>{""}</th>
        {Object.entries(data).map(([k, v]) => (
          <th key={k}>{k}</th>
        ))}
      </tr>
    </thead>
  )
}
