import React from "react";

export interface Props {
  columns: Array<{title: string, key: string}>,
  data: any[]
}

function Table({ columns, data }: Props) {
  return (
    <table>
      <thead>
        {columns.map(({title}) => (
          <th>{title}</th>
        ))}
      </thead>
      <tbody>
        {data.map((row) => {
          return (
            <tr>
              {columns.map(({key}) => {
                return <td>{row[key]}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default Table;
