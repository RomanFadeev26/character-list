import React from 'react';
import fst from 'crocks/Pair/fst';
import snd from 'crocks/Pair/snd';
import toPairs from 'crocks/Pair/toPairs';
import listToArray from 'crocks/List/listToArray';
import {map, merge} from 'crocks/pointfree'
import composeB from 'crocks/combinators/composeB';
import pick from 'crocks/helpers/pick';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import baseCharacteristics from '../../store/selectors/baseCharacteristics';
import classes from './BaseCharacteristics.module.css';

const baseCharacteristicsText = {
    strength: 'Сила',
    dexterity: 'Ловкость',
    constitution: 'Телосложение',
    intelligence: 'Интеллект',
    wisdom: 'Мудрость',
    charisma: 'Харизма'
};

const mergerCharacteristicsPair = (charName, charValuePair) => (
	<li className={classes.CharacteristicBlock}>
		<div>{fst(charValuePair)}</div>
		<div>{baseCharacteristicsText[charName]}</div>
		<div>{snd(charValuePair)}</div>
	</li>
);

const characteristicToText = merge(mergerCharacteristicsPair);
const mapPairsToTexts = composeB(listToArray, map(characteristicToText));
const keysForProps =  Object.keys(baseCharacteristicsText);
const propsToPairs = composeB(toPairs, pick(keysForProps));
const propsToText = composeB(mapPairsToTexts, propsToPairs);

const BaseCharacteristics = (props) => (<ul className={classes.Characteristics}>{propsToText(props)}</ul>);

const connector = composeB(withRouter, connect(baseCharacteristics));

export default connector(BaseCharacteristics);
