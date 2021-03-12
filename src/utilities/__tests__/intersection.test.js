import intersection from '../intersection';

describe('should return arrays intersections', () => {
	test('should return speed', () => {
		const testObj1 = [
			'name', 'speed'
		];

		const testObj2 = [
			'firstName',
			'speed'
		];

		expect(intersection(testObj1, testObj2)).toEqual(['speed']);
	});
});
