import * as React from "react"
import { Row } from "../Table"

export const Rows = (props: { data: any; maxRows: number }) => {
  const { data, maxRows } = props
  return (
    <tbody>
      {data.slice(0, maxRows).map((row: any, index: number) => (
        <Row key={`row${index}`} data={row} />
      ))}
    </tbody>
  )
}
