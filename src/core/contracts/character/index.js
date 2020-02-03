import map from 'crocks/pointfree/map';
import mapProps from 'crocks/helpers/mapProps';
import baseCharacteristicsContract from './baseCharacteristics';
import alignmentsContract from './alignment';
import classesContract from './classes';

const characterContract = {
    alignment: alignmentsContract,
    baseCharacteristics: baseCharacteristicsContract,
    classes: map(mapProps(classesContract))
};

export default characterContract;