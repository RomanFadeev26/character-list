import Maybe from 'crocks/Maybe';
import {baseCharacteristicPair} from './baseCharacteristicsModel';

const baseCharacteristics = {
	strength: 5,
	dexterity: 1,
	constitution: 3,
	intelligence: 10,
	wisdom: 11,
	charisma: 9
};

describe("should correct calculate base characteristics", () => {
	test('should calc baseCharacteristics and Modifiers from character\'s object', () => {
		const values = Object.values(baseCharacteristics);
		const baseCharGetter = baseCharacteristicPair(a => Maybe.Just(a));
		console.log(baseCharGetter);
		const result = values.map(baseCharGetter);
		console.log(result);
		expect(result).toEqual(
			[5, -3, 1, -5, 3, -4, 10, 0, 11, 0, 9, -1]
		)
	});
});
