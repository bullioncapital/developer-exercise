import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, fireEvent, waitForElement } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import App from './App'

const endpoint = 'http://localhost:3001/farmers-market/'

const server = setupServer(
  rest.get(endpoint, (req, res, ctx) => {
    return res(ctx.json([
      {
        FMID: 1000001,
        MarketName: 'Shelby Food and Craft Market',
        updateTime: '2009'
      },
      {
        FMID: 1000003,
        MarketName: 'Edmore Farmers Market',
        updateTime: '3/14/2014 11:06'
      },
      {
        FMID: 1000005,
        MarketName: 'Edmore Farmers Market',
        updateTime: 'Edmore Farmers Market'
      },
      {
        FMID: 1000007,
        MarketName: 'Edmore Farmers Market',
        updateTime: '3/15/2014 11:06'
      },
      {
        FMID: 1000009,
        MarketName: 'Edmore Farmers Market',
        updateTime: '3/16/2014 11:06'
      },
      {
        FMID: 1000011,
        MarketName: 'Edmore Farmers Market',
        updateTime: '3/17/2014 11:06'
      },
      {
        FMID: 1000013,
        MarketName: 'Edmore Farmers Market',
        updateTime: '3/17/2014 11:06'
      },
      {
        FMID: 1000015,
        MarketName: 'Edmore Farmers Market',
        updateTime: '3/17/2014 11:06'
      },
      {
        FMID: 1000017,
        MarketName: 'Edmore Farmers Market',
        updateTime: '3/17/2014 11:06'
      },
      {
        FMID: 1000019,
        MarketName: 'Edmore Farmers Market',
        updateTime: '3/17/2014 11:06'
      },
      {
        FMID: 1000021,
        MarketName: 'Edmore Farmers Market',
        updateTime: '3/17/2014 11:06'
      }
    ]))
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Tests App.tsx', () => {
  describe('Test Filtering', () => {
    test('Should filter by All value of Shelby Food and Craft Market', async () => {
      const { getByText, getByTestId } = render(<App />)
      const searchBox = getByTestId('search-box')
      fireEvent.change(searchBox, { target: { value: 'Shelby Food and Craft Market' } })
      await waitForElement(() => getByText(/1000001/i))
    })

    test('Should filter by MarketName value of Edmore Farmers Market', async () => {
      const { getByText, getByTestId } = render(<App />)
      const searchBox = getByTestId('search-box')
      const columnSelect = getByTestId('column-select')
      fireEvent.change(columnSelect, { target: { value: 'MarketName' } })
      fireEvent.change(searchBox, { target: { value: 'Edmore Farmers Market' } })
      await waitForElement(() => getByText(/1000003/i))
    })
  })

  describe('Test Pagination', () => {
    test('Should goto last page', async () => {
      const { getByTestId, getByText } = render(<App />)
      const last = getByTestId('last')
      await waitForElement(() => getByText(/1000001/i))
      fireEvent.click(last)
      await waitForElement(() => getByText(/1000021/i))
    })

    test('Should goto first page', async () => {
      const { getByTestId, getByText } = render(<App />)
      await waitForElement(() => getByText(/1000001/i))
      fireEvent.click(getByTestId('last'))
      await waitForElement(() => getByText(/1000021/i))
      fireEvent.click(getByTestId('first'))
      await waitForElement(() => getByText(/1000001/i))
    })

    test('Should goto next page', async () => {
      const { getByTestId, getByText } = render(<App />)
      const first = getByTestId('next')
      await waitForElement(() => getByText(/1000001/i))
      fireEvent.click(first)
      await waitForElement(() => getByText(/1000013/i))
    })

    test('Should goto back page', async () => {
      const { getByTestId, getByText } = render(<App />)
      await waitForElement(() => getByText(/1000001/i))
      const last = getByTestId('last')
      fireEvent.click(last)
      await waitForElement(() => getByText(/1000021/i))
      const back = getByTestId('back')
      fireEvent.click(back)
      await waitForElement(() => getByText(/1000013/i))
    })
  })
})
