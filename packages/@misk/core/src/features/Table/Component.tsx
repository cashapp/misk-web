import { Classes, HTMLTable } from "@blueprintjs/core"
import * as React from "react"
import { Heading, Rows } from "../Table"

export interface ITableProps {
  data: any[]
  range?: number[]
}

export const Table = (props: ITableProps) => {
  const { data, range = [0, data && data.length] } = props
  if (data && data.length > 0) {
    /**
     * Data is loaded and ready to be rendered
     */
    const tableData = data
    return (
      <HTMLTable bordered={true} striped={true}>
        <Heading data={tableData[0]} />
        <Rows data={tableData} range={range} />
      </HTMLTable>
    )
  } else {
    /**
     * Have a nice failure mode while your data is loading or doesn't load
     */
    const FakeCell = <p className={Classes.SKELETON}>lorem ipsum 1234 5678</p>
    return (
      <HTMLTable bordered={true} striped={true}>
        <thead>
          <tr>
            <th>{FakeCell}</th>
            <th>{FakeCell}</th>
            <th>{FakeCell}</th>
            <th>{FakeCell}</th>
            <th>{FakeCell}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{FakeCell}</td>
            <td>{FakeCell}</td>
            <td>{FakeCell}</td>
            <td>{FakeCell}</td>
            <td>{FakeCell}</td>
          </tr>
        </tbody>
      </HTMLTable>
    )
  }
}
