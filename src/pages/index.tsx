import { useState } from 'react'

import { DistanceForm } from '~/components/distance-form/distance-form'
import { PartnerCard } from '~/components/partner-card/partner-card'
import { useLocations } from '~/hooks/useLocations'

export default function Home() {
	const [desiredKm, setDesiredKm] = useState(100)
	const { data, isLoading, error } = useLocations(desiredKm)

	if (isLoading)
		return (
			<div className='text-2xl font-bold animate-pulse fixed h-full w-full top-0 bottom-0 flex justify-center items-center'>
				Loading...
			</div>
		)

	if (!data || error instanceof Error)
		return <div role={'alert'}>An error occured {error ? error.message : 'no result'}</div>

	return (
		<div className='mx-auto p-3 max-w-[1200px] md:p-5'>
			<h1>Party Locations</h1>
			<DistanceForm defaultKm={desiredKm} onKmUpdate={(km) => setDesiredKm(km)} />
			<div className='text-center py-4' role={'dialog'}>
				There are{' '}
				<strong role={'contentinfo'} className='inline-block p-1 bg-gray-200 rounded'>
					{data.length}
				</strong>{' '}
				partners that you can invite for a crazy birthday party!
			</div>

			<div className='grid grid-cols-2 grid-flow-row gap-5 md:grid-cols-4 mt-4'>
				{data
					.sort(({ partner_id: a }, { partner_id: b }) => +a - +b)
					.map(({ partner_id, name }) => (
						<PartnerCard name={`${partner_id} - ${name}`} key={partner_id} />
					))}
			</div>
		</div>
	)
}
