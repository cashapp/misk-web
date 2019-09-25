import * as React from "react"
export const Row = (props: { data: any }) => {
  const { data } = props
  return (
    <tr>
      {Object.entries(data).map(([k, v]) => (
        <td key={k}>{v}</td>
      ))}
    </tr>
  )
}
