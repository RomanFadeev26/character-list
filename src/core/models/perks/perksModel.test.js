import perksModel, {isMaster, calcStrPerk, calcWisPerk} from "./perksModel";

const characterMock = {
    baseCharacteristics: {
        strength: 5,
        dexterity: 1,
        constitution: 3,
        intelligence: 10,
        wisdom: 11,
        charisma: 9
    },
    proficiencyBonus: 2,
    perks: {
        proficiency: ['acrobatics', 'athletics']
    }
};

test('should calc perks from character\'s object', () => {
    expect(perksModel(characterMock)).toEqual({
        athletics: -1,
        acrobatics: -3,
        sleightOfHand: -5,
        stealth: -5,
        arcana: 0,
        history: 0,
        investigation: 0,
        nature: 0,
        religion: 0,
        animalHandling: 0,
        insight: 0,
        medicine: 0,
        perception: 0,
        survival: 0,
        deception: -1,
        intimidation: -1,
        performance: -1,
        persuasion: -1
    })
});

describe("should isMaster correct check skills", () => {
    test("should athletics master skill", () => {
        expect(isMaster("athletics", characterMock)).toBe(true);
    });

    test("should acrobatics master skill", () => {
        expect(isMaster("acrobatics", characterMock)).toBe(true);
    });

    test("should perception is not master skill", () => {
        expect(isMaster("perception", characterMock)).toBe(false);
    });
});

describe("should calculate skill from character object", () => {
    test("athletic should be 7", () => {
        expect(calcStrPerk("athletics", characterMock)).toBe(-1);
    });

    test("perception should be 11", () => {
        expect(calcWisPerk("perception", characterMock)).toBe(0);
    });
});
