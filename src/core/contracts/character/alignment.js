import RefinementType from 'utilities/RefinementType';

const alignments = ['LG', 'NG', 'CG', 'LN', 'NN', 'CN', 'LE', 'NE', 'CE'];

const oneOfAlignments = RefinementType.of(x => {
    if(alignments.includes(x)) return x;
    throw new Error('Alignment should be one of the list: ' + alignments.join(', '));
});

const mustBeString = RefinementType.of(x => {
    if(typeof x === 'string') return x;
    throw new Error('Alignment must be a string');
});

const alignmentsContract = oneOfAlignments.and(mustBeString).match;

export default alignmentsContract;