import React from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {composeB} from 'crocks/combinators';
import {map} from 'crocks/pointfree';
import {characterClasses} from '../../store/selectors/character';
import classes from './Classes.module.css';

const buildClassesBlocks = map(characterClass => (
	<div className={classes.CharacterClasses}>
		<span>Class: {characterClass.type}</span> / <span>Level: {characterClass.level}</span>
	</div>
));

const Classes = (props) => (<div>{buildClassesBlocks(props.characterClasses)}</div>);

const connector = composeB(withRouter, connect(state => ({characterClasses: characterClasses(state)})));

export default connector(Classes);
