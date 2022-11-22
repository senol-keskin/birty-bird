import type { MutableRefObject } from 'react'

import { useState, useRef } from 'react'
import { useLocations } from '~/hooks/useLocations'

export default function Home() {
	const [desiredKm, setDesiredKm] = useState(100)
	const { data, isLoading, error } = useLocations(desiredKm)

	const kmInputRef = useRef() as MutableRefObject<HTMLInputElement>

	if (isLoading)
		return (
			<div className='text-2xl font-bold animate-pulse fixed h-full w-full top-0 bottom-0 flex justify-center items-center'>
				Loading...
			</div>
		)

	if (!data) return <div className='dan'>{error ? error.message : 'no result'} </div>

	return (
		<div className='mx-auto p-3 max-w-[1200px] md:p-5'>
			<div>
				<label className='block'>
					Input to calculate in Km, default is <code>100Km</code>
				</label>
				<div>
					<input
						type={'number'}
						ref={kmInputRef}
						defaultValue={desiredKm}
						className='rounded border p-2 text-sm'
					/>
					<button
						type='button'
						className='bg-slate-500 text-white p-2 rounded text-sm'
						onClick={() => setDesiredKm(+kmInputRef.current.value)}
					>
						Update
					</button>
				</div>
			</div>
			<div className='text-center py-4'>
				There are <strong className='inline-block p-1 bg-gray-200 rounded'>{data.length}</strong>{' '}
				partners that you can invite for a crazy birthday party!
			</div>
			<div className='grid grid-cols-2 grid-flow-row gap-5 md:grid-cols-4 mt-4'>
				{data.map(({ partner_id, name }) => (
					<div key={partner_id} className='border p-3 md:p-5 rounded-lg shadow-md'>
						{name}
					</div>
				))}
			</div>
		</div>
	)
}
