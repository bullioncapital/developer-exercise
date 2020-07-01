import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import App from './App'

describe('App Tests', () => {
  describe('Test Filtering', () => {
    test('Should filter by All value of 13775', async () => {
      const { findByText, getByTestId } = render(<App />)
      const searchBox = getByTestId('search-box')
      fireEvent.change(searchBox, { target: { value: 13775 } })
      const FMID1 = await findByText('1000249')
      const FMID2 = await findByText('1000249')
      expect(FMID1).toBeInTheDocument()
      expect(FMID2).toBeInTheDocument()
    })

    test('Should filter by ZipCode value of 53208', async () => {
      const { findByText, getByTestId } = render(<App />)
      const searchBox = getByTestId('search-box')
      const columnSelect = getByTestId('column-select')
      fireEvent.change(searchBox, { target: { value: 53208 } })
      fireEvent.change(columnSelect, { target: { value: 'zipCode' } })
      const FMID = await findByText('1009377')
      expect(FMID).toBeInTheDocument()
    })
  })
})
