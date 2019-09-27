import * as React from "react"
import { Row } from "../Table"

export const Rows = (props: { data: any; range: number[] }) => {
  const { data, range } = props
  return (
    <tbody>
      {data.slice(...range).map((row: any, index: number) => (
        <Row key={`row${index}`} data={row} index={range[0] + index} />
      ))}
    </tbody>
  )
}
