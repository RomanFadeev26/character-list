import React from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {composeB} from 'crocks/combinators';
import {fetchCharacterAction} from '../../store/entities/characters/actions';
import {characterPersonality} from '../../store/selectors/character';
import BaseCharacteristics from '../BaseCharacteristics';
import Perks from '../Perks';
import Speed from '../Speed';
import SafeThrows from '../SafeThrows';
import Classes from '../Classes';
import PassivePerception from '../PassivePerception';
import classes from './CharacterPage.module.css';

class CharacterPage extends React.Component {
	componentDidMount() {
		const {fetchCharacter} = this.props;
		const {id} = this.props.match.params;
		fetchCharacter(id);
	}

	render() {
		const {name, level} = this.props;
		return (
			<div className={classes.CharacterPage}>
				<div>
					<div>Name: {name} / Level: {level}</div>
					<Classes />
				</div>
				<div className={classes.perks}>
					<div>
						<BaseCharacteristics />
						<PassivePerception />
					</div>
					<div>
						<SafeThrows/>
						<Perks/>
					</div>
				</div>
				<div>
					<Speed />
				</div>
			</div>);
	}
}

const connector = composeB(withRouter, connect(characterPersonality, {fetchCharacter: fetchCharacterAction}));

export default connector(CharacterPage);
