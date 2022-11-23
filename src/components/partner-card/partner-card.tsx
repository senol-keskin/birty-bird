export type PartnerCardProps = {
	name: string
}

export const PartnerCard: React.FC<PartnerCardProps> = ({ name }) => (
	<div role={'listitem'} className='border p-3 md:p-5 rounded-lg shadow-md bg-white'>
		{name}
	</div>
)
