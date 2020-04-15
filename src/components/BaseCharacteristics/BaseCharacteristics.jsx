import React from 'react';
import fst from 'crocks/Pair/fst';
import snd from 'crocks/Pair/snd';
import {connect} from 'react-redux';
import { withRouter } from 'react-router';
import baseCharacteristics from "../../store/selectors/baseCharacteristics";
import composeB from 'crocks/combinators/composeB';

const BaseCharacteristics = ({
    strength,
    dexterity,
    constitution,
    intelligence,
    wisdom,
    charisma
}) => (
    <div>
        <div>Сила: {fst(strength)} Модификатор: {snd(strength)}</div>
        <div>Ловкость: {fst(dexterity)} Модификатор: {snd(dexterity)}</div>
        <div>Телосложение: {fst(constitution)} Модификатор: {snd(constitution)}</div>
        <div>Интеллект: {fst(intelligence)} Модификатор: {snd(intelligence)}</div>
        <div>Мудрость: {fst(wisdom)} Модификатор: {snd(wisdom)}</div>
        <div>Харизма: {fst(charisma)} Модификатор: {snd(charisma)}</div>
    </div>
);

const connector = composeB(withRouter, connect(baseCharacteristics));

export default connector(BaseCharacteristics);
