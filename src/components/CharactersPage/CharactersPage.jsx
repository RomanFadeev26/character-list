import React, { PureComponent } from "react";
import { fetchAllCharactersAction } from 'store/entities/characters/actions';
import { previews } from 'store/selectors/characters';
import { connect } from 'react-redux';
import CharacterPreviewCard from './CharacterPreviewCard';

class CharactersPage extends PureComponent {

    componentDidMount() {
        const { fetchAllCharacters } = this.props;
        fetchAllCharacters(); 
    }

    render() {
        const { previews } = this.props;
        return previews.map(preview => (<CharacterPreviewCard {...preview} />));
    }
}


export default connect(previews, {fetchAllCharacters: fetchAllCharactersAction})(CharactersPage);
