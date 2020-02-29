import perksModel, {isMaster, calcStrPerk, calculatorArray, calcWisPerk} from "./perksModel";

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

it('should calc perks from character\'s object', () => {
    expect(perksModel(characterMock)).toEqual({
        athletics: 7,
        acrobatics: 3,
        sleightOfHand: 1,
        stealth: 1,
        arcana: 10,
        history: 10,
        investigation: 10,
        nature: 10,
        religion: 10,
        animalHandling: 11,
        insight: 11,
        medicine: 11,
        perception: 11,
        survival: 11,
        deception: 9,
        intimidation: 9,
        performance: 9,
        persuasion: 9
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
        expect(calcStrPerk("athletics", characterMock)).toBe(7);
    });

    test("perception should be 11", () => {
        expect(calcWisPerk("perception", characterMock)).toBe(11);
    });
});
