import CharactersPage from "components/CharactersPage";

const index = '/';
const characters = '/characters';
const character = '/characters/:id';

export const CharactersPageRoute = {path: characters, component: CharactersPage, exact: true, key: characters};
