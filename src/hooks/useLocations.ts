import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export type Location = {
	latitude: string
	partner_id: number | string
	name: string
	longitude: string
}

export type Locations = Location[]

const fetchLocations = async (km: number): Promise<Locations> => {
	const response = await axios.get('/api/locations', {
		params: { km },
	})

	return response.data
}

/**
 *
 * @param km is the distance, default km is 100
 */
const useLocations = (km = 100) => {
	return useQuery<Locations, Error>(['locations', km], () => fetchLocations(km))
}

export { useLocations, fetchLocations }
