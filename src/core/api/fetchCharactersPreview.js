import asyncAxios from 'utilities/asyncAxios';

const fetchCharactersPreview = asyncAxios({
    method: 'get',
    url: 'characters',
});

export default fetchCharactersPreview;