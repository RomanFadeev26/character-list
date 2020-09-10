import React from 'react';
import {withRouter} from 'react-router';
import BaseCharacteristics from '../BaseCharacteristics';
import {fetchCharacterAction} from '../../store/entities/characters/actions';
import {connect} from 'react-redux';
import Perks from '../Perks';
import {composeB} from 'crocks/combinators';
import classes from './CharacterPage.module.css';

class CharacterPage extends React.Component{
    componentDidMount() {
        const { fetchCharacter } = this.props;
        const { id } = this.props.match.params;
        fetchCharacter(id);
    }

    render() {
        return (<div className={classes.CharacterPage}><BaseCharacteristics /><Perks /></div>);
    }
}

const connector = composeB(withRouter, connect(null, {fetchCharacter: fetchCharacterAction}));

export default connector(CharacterPage);
