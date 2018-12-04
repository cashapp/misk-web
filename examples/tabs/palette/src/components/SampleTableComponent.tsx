import { Classes, H1, HTMLTable } from "@blueprintjs/core"
import * as React from "react"

export interface ITableProps {
  data: any
  rows?: number
}

const Row = (props: ITableProps) => {
  const { data } = props
  return <tr>{data && Object.entries(data).map(([k, v]) => <td>{v}</td>)}</tr>
}

const Rows = (props: ITableProps) => {
  const { data, rows } = props
  return (
    <tbody>
      {data && data.slice(0, rows).map((row: any) => <Row data={row} />)}
    </tbody>
  )
}

const Heading = (props: ITableProps) => {
  const { data } = props
  return (
    <thead>
      <tr>
        {data && Object.entries(data).map(([k, v]) => <th key={k}>{k}</th>)}
      </tr>
    </thead>
  )
}

export const SampleTableComponent = (props: ITableProps) => {
  const { data, rows = 5 } = props
  if (data.data != null) {
    const tableData = data.data.cars
    return (
      <div>
        <H1>Table</H1>
        <HTMLTable bordered={true} striped={true}>
          <Heading data={tableData[0]} />
          <Rows data={tableData} rows={rows} />
        </HTMLTable>
      </div>
    )
  } else {
    const FakeCell = <p className={Classes.SKELETON}>lorem ipsum 1234 5678</p>
    return (
      <div>
        <H1>Table</H1>
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
      </div>
    )
  }
}

export default SampleTableComponent
