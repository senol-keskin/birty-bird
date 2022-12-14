import Home from '~/pages/index'
import { rest } from 'msw'
import { waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { renderWithClient } from '~/mocks/utils'
import { server } from '~/jest.setup'

describe('Home page', () => {
	test('should render correctly', () => {
		renderWithClient(<Home />)
	})

	test('show loading state', () => {
		const renderHome = renderWithClient(<Home />)

		expect(renderHome.getByText(/loading/i)).toBeInTheDocument()
	})

	test('should have heading', async () => {
		const renderHome = renderWithClient(<Home />)
		await waitFor(() => renderHome.findByRole('heading'))
		expect(renderHome.getByRole('heading').textContent).toEqual('Party Locations')
	})

	test('should a text with count info', async () => {
		const renderHome = renderWithClient(<Home />)
		await waitFor(() => expect(renderHome.getByRole('contentinfo').textContent).toBe('4'))
	})

	test('should render list', async () => {
		const renderHome = renderWithClient(<Home />)
		await waitFor(() => {
			expect(renderHome.getAllByRole('listitem')).toHaveLength(4)
		})
	})

	test('show error state', async () => {
		server.use(rest.get('/api/locations', (req, res, ctx) => res(ctx.status(500))))

		const renderedHome = renderWithClient(<Home />)
		expect(await renderedHome.findByText(/an error occured/i)).toBeInTheDocument()
	})

	test('should have input and default value is 100', async () => {
		const renderedHome = renderWithClient(<Home />)
		await waitFor(() => renderedHome.getByRole('textbox'))
		expect(renderedHome.getByRole('textbox')).toHaveValue('100')
	})

	test('should have update input value', async () => {
		userEvent.setup()
		const renderedHome = renderWithClient(<Home />)
		await waitFor(async () => {
			const inputEl = renderedHome.getByRole('textbox')
			await userEvent.clear(inputEl)
			await userEvent.type(inputEl, '120')
			expect(inputEl).toHaveValue('120')
		})
	})

	test('should have info text with result count', async () => {
		userEvent.setup()
		const renderedHome = renderWithClient(<Home />)
		await waitFor(() => {
			const dialog = renderedHome.getByRole('dialog')
			expect(dialog).toHaveTextContent(
				'There are 4 partners that you can invite for a crazy birthday party!',
			)
		})
	})
})
