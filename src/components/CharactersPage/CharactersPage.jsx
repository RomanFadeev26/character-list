import React, { PureComponent } from "react";
import { fetchAllCharactersAction } from '../../store/entities/characters/actions';
import { previews } from '../../store/selectors/characters';
import { connect } from 'react-redux';
import CharacterPreviewCard from '../CharacterPreviewCard';
import styles from './CharactersPage.module.css';

class CharactersPage extends PureComponent {

    componentDidMount() {
        const { fetchAllCharacters } = this.props;
        fetchAllCharacters();
    }

    render() {
        const { previews } = this.props;
        return <main className={styles.CharactersPage}>{previews.map(preview => (<CharacterPreviewCard key={preview.id} {...preview} />))}</main>;
    }
}

export default connect(previews, {fetchAllCharacters: fetchAllCharactersAction})(CharactersPage);
