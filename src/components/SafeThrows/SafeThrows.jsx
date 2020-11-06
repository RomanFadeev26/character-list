import React from 'react';
import {connect} from 'react-redux';
import composeB from 'crocks/combinators/composeB';

import {withRouter} from 'react-router';

import safeThrows from '../../store/selectors/safeThrows';
import {map, merge} from 'crocks/pointfree';
import cls from 'classnames';
import classes from './SafeThrows.module.css';
import compose from 'crocks/helpers/compose';
import toPairs from 'crocks/Pair/toPairs';
import pick from 'crocks/helpers/pick';
import listToArray from 'crocks/List/listToArray';
import Pair from 'crocks/Pair';

const safeThrowsText = {
	strength: 'Сила',
	dexterity: 'Ловкость',
	constitution: 'Телосложение',
	intelligence: 'Интеллект',
	wisdom: 'Мудрость',
	charisma: 'Харизма'
};

const safeThrowsPairToText = (profs, safeThrows) =>
	safeThrows.map(
		merge(
			(safeThrowName, value) => (
				<li className={cls(classes.SafeThrow, {[classes.selected]: profs.includes(safeThrowName)})}>
					{`${safeThrowsText[safeThrowName]}: ${value}`}
				</li>
			)
		)
	);
const keysForProps = Object.keys(safeThrowsText);
const propsToPairs = compose(toPairs, pick(keysForProps));
const mapPairsToTexts = compose(merge(safeThrowsPairToText), map(listToArray));
const safeThrowsToText = compose(mapPairsToTexts, map(propsToPairs), props => Pair(props.proficiencies, props.safeThrows));

const SafeThrows = (props) => {
	console.log(props);
	return (<ul className={classes.SafeThrowsList}>{safeThrowsToText(props)}</ul>);
};

const connector = composeB(withRouter, connect(safeThrows));

export default connector(SafeThrows);
