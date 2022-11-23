import { render, screen, waitFor, Providers, renderHook } from '@test-wrapper'
import { server, rest } from '~/mocks/server'

import Home from '~/pages/index'
import { useLocations } from '~/hooks/useLocations'

global.fetch = jest.fn(() =>
	Promise.resolve({
		json: () => Promise.resolve({ test: 100 }),
	}),
) as jest.Mock

describe('Home page', () => {
	const renderHomePage = () => render(<Home />)

	test('should render with loading', () => {
		renderHomePage()

		const loader = screen.getByText(/loading/i)

		expect(loader).toBeInTheDocument()
	})
})
