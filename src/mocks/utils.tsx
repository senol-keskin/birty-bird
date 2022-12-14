import { render } from '@testing-library/react'
import { rest } from 'msw'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import fixtures from '~/mocks/fixture.json'

export const handlers = [
	rest.get('/api/locations', (req, res, ctx) => {
		return res(ctx.status(200), ctx.json(fixtures))
	}),
]

const createTestQueryClient = () =>
	new QueryClient({
		defaultOptions: {
			queries: {
				retry: false,
			},
		},
		logger: {
			log: console.log,
			warn: console.warn,
			error: () => {},
		},
	})

export function renderWithClient(ui: React.ReactElement) {
	const testQueryClient = createTestQueryClient()
	const { rerender, ...result } = render(
		<QueryClientProvider client={testQueryClient}>{ui}</QueryClientProvider>,
	)
	return {
		...result,
		rerender: (rerenderUi: React.ReactElement) =>
			rerender(<QueryClientProvider client={testQueryClient}>{rerenderUi}</QueryClientProvider>),
	}
}

export function createWrapper() {
	const testQueryClient = createTestQueryClient()
	// eslint-disable-next-line react/display-name
	return ({ children }: { children: React.ReactNode }) => (
		<QueryClientProvider client={testQueryClient}>{children}</QueryClientProvider>
	)
}
