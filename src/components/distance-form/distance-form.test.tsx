import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { DistanceForm } from './distance-form'
const mockFn = jest.fn(() => {
	return Promise.resolve()
})

describe('Form component', () => {
	test('should render an input and a button', () => {
		render(<DistanceForm />)
		expect(screen.getByRole('textbox')).toBeInTheDocument()
		expect(screen.getByRole('button')).toBeInTheDocument()
	})

	test('button should call prop function', async () => {
		userEvent.setup()
		render(<DistanceForm onKmUpdate={mockFn} />)
		const button = screen.getByRole('button')
		await userEvent.click(button)
		expect(mockFn).toBeCalled()
	})
})
