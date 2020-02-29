import curry from 'crocks/helpers/curry';

export default curry(function includes(el, array) {
    return Array.prototype.includes.call(array, el);
});
