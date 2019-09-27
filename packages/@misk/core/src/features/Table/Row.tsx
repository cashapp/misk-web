import * as React from "react"
export const Row = (props: { data: any; index?: number }) => {
  const { data, index } = props
  return (
    <tr>
      {index && <td key={"index"}>{index}</td>}
      {Object.entries(data).map(([k, v]) => (
        <td key={k}>{v}</td>
      ))}
    </tr>
  )
}
