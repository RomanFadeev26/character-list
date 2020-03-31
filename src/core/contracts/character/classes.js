import RefinementType from '../../../utilities/RefinementType';

const classes = [
    'wizard',
    'warlock',
    'fighter',
    'bard',
    'barbarian',
    'druid',
    'cleric',
    'monk',
    'paladin',
    'rogue',
    'ranger',
    'sorcerer'
];

const oneOfClasses = RefinementType.of(x => {
    if(classes.includes(x)) return x;
    throw new Error('Class should be one of the list: ' + classes.join(', '));
});

const mustBeString = RefinementType.of(x => {
    if(typeof x === 'string') return x;
    throw new Error('Class must be a string');
});

const classesContract = {type: oneOfClasses.and(mustBeString).match};

export default classesContract;
