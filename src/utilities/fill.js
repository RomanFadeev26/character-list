import curry from 'crocks/helpers/curry';

export default curry(function fill(el, array) {
    return Array.prototype.fill.call(array, el);
});
