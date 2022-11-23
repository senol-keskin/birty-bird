import { PartnerCard } from '~/components/partner-card/partner-card'
import { render, screen } from '@testing-library/react'

test('Should render properly', () => {
	render(<PartnerCard name='Bilbo Baggins' />)
	const partnerName = screen.getByText('Bilbo Baggins')

	expect(partnerName).toBeInTheDocument()
})
