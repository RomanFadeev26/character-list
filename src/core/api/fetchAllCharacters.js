import asyncAxios from 'utilities/asyncAxios';

const fetchAllCharacters = asyncAxios({
    method: 'get',
    url: 'characters',
});

export default fetchAllCharacters;