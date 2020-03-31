import RefinementType from '../../../utilities/RefinementType';

const lesserThenMax = type => RefinementType.of(x => {
    if(x <= 20) return x;
    throw new Error(`${type} should be lesser then 20`);
});

const largerThenMin = type => RefinementType.of(x => {
    if(x >= 0) return x;
    throw new Error(`${type} should be bigger then 0`);
});

const isNumber = type => RefinementType.of(x => {
    if(typeof x === 'number') return x;
    throw new Error(`${type} should be a number`)
});

const baseCharacteristic = type => lesserThenMax(type).and(largerThenMin(type)).and(isNumber(type)).match;

const baseCharacteristicsContract = {
    "strength": baseCharacteristic("strength"),
    "dexterity": baseCharacteristic("dexterity"),
    "constitution": baseCharacteristic("constitution"),
    "intelligence": baseCharacteristic("intelligence"),
    "wisdom": baseCharacteristic("wisdom"),
    "charisma": baseCharacteristic("charisma")
};

export default baseCharacteristicsContract;
