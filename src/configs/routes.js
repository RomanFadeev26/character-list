import CharactersPage from "../components/CharactersPage";
import CharacterPage from "../components/CharacterPage";

const INDEX = '/';
const CHARACTERS = '/characters';
const CHARACTER = `${CHARACTERS}/:id`;

export const CharactersPageRoute = {path: CHARACTERS, component: CharactersPage, exact: true, key: CHARACTERS};
export const CharacterPageRoute = {path: CHARACTER, component: CharacterPage, key: CHARACTER};
