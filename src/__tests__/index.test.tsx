import Home from '~/pages/index'
import { rest } from 'msw'
import { renderWithClient } from '~/mocks/utils'

import { server } from '~/jest.setup'

describe('Home page', () => {
	test('show loading state', () => {
		const renderHome = renderWithClient(<Home />)

		expect(renderHome.getByText(/loading/i)).toBeInTheDocument()
	})

	test('show error state', async () => {
		server.use(rest.get('/api/locations', (req, res, ctx) => res(ctx.status(500))))

		const result = renderWithClient(<Home />)
		expect(await result.findByText(/an error occured/i)).toBeInTheDocument()
	})
})
