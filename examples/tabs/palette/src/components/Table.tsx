import { HTMLTable, H1 } from "@blueprintjs/core"
import * as React from "react"

export interface IUrlTokenMetadata {
  created_at: string
  long_url: string
  short_url: string
  token: string
  updated_at: string
}

const Row = (props: { data: IUrlTokenMetadata }) => {
  const { data } = props
  return (
    <tr>
      <td>{data.created_at}</td>
      <td>
        <a href={data.long_url}>{data.long_url}</a>
      </td>
      <td>
        <a href={data.short_url}>{data.short_url}</a>
      </td>
      <td>{data.token}</td>
      <td>{data.updated_at}</td>
    </tr>
  )
}

export const Table = (props: { data: IUrlTokenMetadata[] }) => {
  const { data } = props
  return (
    <div>
      <H1>Table</H1>
      <HTMLTable bordered={true} striped={true}>
        <thead>
          <tr>
            <th>Created At</th>
            <th>Long Url</th>
            <th>Short Url</th>
            <th>Token</th>
            <th>Updated At</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((urlmeta: IUrlTokenMetadata) => <Row data={urlmeta} />)}
        </tbody>
      </HTMLTable>
    </div>
  )
}

export default Table
