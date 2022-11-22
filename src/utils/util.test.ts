import { distance } from '~/utils/calculateDistance'

test('should return in km with given value exactly same', () => {
	var result = distance(41.9279411, 25.9083249, 42.6665921, 23.351723, 'K')
	expect(result).toEqual(225.72133483992164)
})

test('should equal or greater', () => {
	var result = distance(42.6049054, 23.0519972, 42.6665921, 23.351723, 'K')
	expect(result).toBeGreaterThanOrEqual(25)
})
