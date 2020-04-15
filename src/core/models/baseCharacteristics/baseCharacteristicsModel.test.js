import baseCharacteristicsModel from "./baseCharacteristicsModel";

const characterMock = {
    baseCharacteristics: {
        strength: 5,
        dexterity: 1,
        constitution: 3,
        intelligence: 10,
        wisdom: 11,
        charisma: 9
    }
};

describe("should correct calculate base characteristics", () => {
    test('should calc baseCharacteristics and Modifiers from character\'s object', () => {
        expect(Object.values(baseCharacteristicsModel(characterMock)).map(t => t.toArray()).flat()).toEqual(
            [5, -3, 1, -5, 3, -4, 10, 0, 11, 0, 9, -1]
        )
    });
});
