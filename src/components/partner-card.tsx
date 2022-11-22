export type PartnerCardProps = {
	name: string
}

export const PartnerCard: React.FC<PartnerCardProps> = ({ name }) => {
	return <div className='border p-3 md:p-5 rounded-lg shadow-md'>{name}</div>
}
