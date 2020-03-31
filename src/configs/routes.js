import CharactersPage from "../components/CharactersPage";
import CharacterPage from "../components/CharacterPage";

const index = '/';
const characters = '/characters';
const character = `${characters}/:id`;

export const CharactersPageRoute = {path: characters, component: CharactersPage, exact: true, key: characters};
export const CharacterPageRoute = {path: character, component: CharacterPage, key: character};
