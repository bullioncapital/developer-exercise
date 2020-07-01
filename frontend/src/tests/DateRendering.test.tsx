import React from 'react';
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import App from '../App';
import '@testing-library/jest-dom/extend-expect'

const server = setupServer(
    rest.get('/data', (req: any, res: any, ctx: any) => {
        return res(ctx.json({FMID: 1, FARMER: 'a'}))
    })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test.skip('loads and displays data', async () => {
    render(<App/>)

    await waitFor(() => screen.getByText('FMID'))
    expect(screen.getByRole('table')).toHaveTextContent('a')
})

test.skip('handlers server error', async () => {
    server.use(
        rest.get('/data', (req, res, ctx) => {
            return res(ctx.status(500))
        })
    )

    render(<App/>)

    await waitFor(() => {
        const linkElement = screen.getByText('Oops something wrong');
        expect(linkElement).toBeInTheDocument();
    })
})

