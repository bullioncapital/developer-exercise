import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, fireEvent, waitFor } from '@testing-library/react'
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
      const { findByText, getByTestId } = render(<App />)
      const searchBox = getByTestId('search-box')
      fireEvent.change(searchBox, { target: { value: 'Shelby Food and Craft Market' } })
      const FMID = await findByText('1000001')
      expect(FMID).toBeInTheDocument()
    })

    test('Should filter by MarketName value of Edmore Farmers Market', async () => {
      const { findByText, getByTestId } = render(<App />)
      const searchBox = getByTestId('search-box')
      const columnSelect = getByTestId('column-select')
      fireEvent.change(columnSelect, { target: { value: 'MarketName' } })
      fireEvent.change(searchBox, { target: { value: 'Edmore Farmers Market' } })
      const FMID = await findByText('1000003')
      expect(FMID).toBeInTheDocument()
    })
  })

  describe('Test Pagination', () => {
    test('Should goto last page', async () => {
      const { getByTestId, findByText } = render(<App />)
      const last = getByTestId('last')
      fireEvent.click(last)
      const FMID = await findByText('1000021')
      expect(FMID).toBeInTheDocument()
    })

    test('Should goto first page', async () => {
      const { getByTestId, findByText } = render(<App />)
      fireEvent.click(getByTestId('last'))
      const FMID1 = await findByText('1000021')
      expect(FMID1).toBeInTheDocument()
      fireEvent.click(getByTestId('first'))
      const FMID2 = await findByText('1000001')
      expect(FMID2).toBeInTheDocument()
    })

    test('Should goto next page', async () => {
      const { getByTestId, findByText } = render(<App />)
      const first = getByTestId('next')
      fireEvent.click(first)
      const FMID = await findByText('1000013')
      expect(FMID).toBeInTheDocument()
    })

    test('Should goto back page', async () => {
      const { getByTestId, findByText } = render(<App />)
      const last = getByTestId('last')
      fireEvent.click(last)
      const FMID1 = await findByText('1000021')
      expect(FMID1).toBeInTheDocument()
      const back = getByTestId('back')
      fireEvent.click(back)
      const FMID2 = await findByText('1000013')
      expect(FMID2).toBeInTheDocument()
    })
  })
})
