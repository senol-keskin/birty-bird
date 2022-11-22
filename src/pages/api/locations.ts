import type { NextApiHandler } from 'next'

import ky from 'ky'
import { Locations } from '~/hooks/useLocations'
import { distance } from '~/utils/calculateDistance'

const handler: NextApiHandler = async (req, res) => {
	const reqQueryKm = req.query?.km ?? 0
	const getText = await ky.get(`http://${req.headers.host}/_db.txt`) // our awesome db
	const textData = await getText.text()
	const data = JSON.parse(`[${textData.replaceAll('\n', ',')}]`) as Locations

	const distanceVal = data.filter((location) => {
		const inKm = distance(+location.latitude, +location.longitude, 42.6665921, 23.351723, 'K')

		return inKm <= +reqQueryKm
	})

	setTimeout(() => {
		res.status(200).json(distanceVal)
	}, 2000)
}

export default handler
