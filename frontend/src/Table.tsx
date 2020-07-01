import React from "react";

export interface Props {
  columns: Array<{title: string, key: string}>,
  data: any[]
  filter?: {
    text: string,
    column?: string
  },
  page?: number
  limit?: number
}

function Table({ columns, data, filter, page, limit = 5 }: Props) {
  // Filter By Column
  if (filter && filter.text.length) {
    data = data.filter(row => {
      if (filter.column) {
        return row[filter.column] && row[filter.column].toString().includes(filter.text)
      } else {
        for (const key in row) {
          if (row[key] && row[key].toString().includes(filter.text)) {
            return true
          }
        }
        return false
      }
    })
  }

  // Filter By Page
  if (page && limit > 0) {
    data = data.slice((page - 1) * limit, page * limit)
  }

  // Display Result
  return (
    <table>
      <thead>
        <tr>
          {columns.map(({ title }, i) => (
            <th key={i}>{title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => {
          return (
            <tr key={i}>
              {columns.map(({ key }, i) => {
                return <td key={i}>{row[key]}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default Table;
