import React, { PureComponent } from "react";
import { fetchAllCharactersAction } from 'store/entities/characters/actions';
import { previews } from 'store/selectors/characters';
import { connect } from 'react-redux';


class CharactersPage extends PureComponent {

    componentDidMount() {
        const { fetchAllCharacters } = this.props;
        fetchAllCharacters(); 
    }

    render() {
        const { previews } = this.props;
        console.log(previews)
        return <div>Test</div>;
    }
}


export default connect(previews, {fetchAllCharacters: fetchAllCharactersAction})(CharactersPage);
