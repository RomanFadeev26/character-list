import React from 'react';
import {connect} from 'react-redux';
import {composeB} from 'crocks/combinators';
import {withRouter} from 'react-router';
import {passivePerception} from '../../store/selectors/perks';
import classes from './PassivePerception.module.css';

const text = {
	passivePerception: "Пассивное восприятие"
};
const propNames = Object.keys(text);
const PassivePerception = (props) => {
	const intersections = Object.keys(props).filter(name => propNames.includes(name));
	return (
		<div className={classes.PassivePerception}>
			{
				intersections.map((name => (
					<div>
						<span>{text[name]}: </span>
						<span>{props[name]}</span>
					</div>)))
			}
		</div>
	)
};

const connector = composeB(connect(passivePerception), withRouter);

export default connector(PassivePerception);
