import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import composeB from 'crocks/combinators/composeB';
import compose from 'crocks/helpers/compose';
import toPairs from 'crocks/Pair/toPairs';
import pick from 'crocks/helpers/pick';
import listToArray from 'crocks/List/listToArray';
import {merge, map} from 'crocks/pointfree';
import perks from '../../store/selectors/perks';
import classes from './Perks.module.css';

const perksText = {
    athletics: 'Атлетика',
    acrobatics: 'Акробатика',
    sleightOfHand: 'Ловкость рук',
    stealth: 'Скрытность',
    arcana: 'Магия',
    history: 'История',
    investigation: 'Расследование',
    nature: 'Природа',
    religion: 'Религия',
    animalHandling: 'Обращение с животными',
    insight: 'Проницательность',
    medicine: 'Медицина',
    perception: 'Восприятие',
    survival: 'Выживание',
    deception: 'Обман',
    intimidation: 'Запугивание',
    performance: 'Выступление',
    persuasion: 'Убеждение'
};

const perksPairToText = (perkName, value) => (<li className={classes.Perk}>{`${perksText[perkName]}: ${value}`}</li>);
const keysForProps = Object.keys(perksText);
const propsToPairs = composeB(toPairs, pick(keysForProps));
const mapPairsToTexts = composeB(listToArray, map(merge(perksPairToText)));
const perksToText = compose(mapPairsToTexts, propsToPairs, props => props.perks);

const Perks = (props) => {
	return (<ul className={classes.PerkList}>{perksToText(props)}</ul>);
};

const connector = composeB(withRouter, connect(perks));

export default connector(Perks);
