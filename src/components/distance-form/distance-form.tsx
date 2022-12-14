import type { MutableRefObject } from 'react'

import { useRef } from 'react'

export type DistanceFormProps = {
	defaultKm?: number
	onKmUpdate?: (arg: number) => void
}

export const DistanceForm: React.FC<DistanceFormProps> = ({
	defaultKm = 100,
	onKmUpdate = () => null,
}) => {
	const kmInputRef = useRef() as MutableRefObject<HTMLInputElement>

	return (
		<div>
			<label className='block'>
				Input to calculate in Km, default is <code>100Km</code>
			</label>
			<div>
				<input
					type={'tel'}
					ref={kmInputRef}
					defaultValue={defaultKm}
					className='rounded border p-2 text-sm'
					maxLength={3}
				/>

				<button
					type='button'
					className='bg-slate-500 text-white p-2 rounded text-sm'
					onClick={() => onKmUpdate(+kmInputRef.current.value)}
				>
					Update
				</button>
			</div>
		</div>
	)
}
