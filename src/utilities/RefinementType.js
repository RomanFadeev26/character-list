function RefinementType(matchingPattern) {
    this.matchingPattern = memoize(matchingPattern);
    this.match = this.match.bind(this);
    this.and = this.and.bind(this);
    this.or = this.or.bind(this);
    this.isValid = this.isValid.bind(this);
}

RefinementType.prototype = Object.create(null);

RefinementType.of = function (matchingPattern) {
    return new RefinementType(matchingPattern);
};

RefinementType.prototype.match = function (value) {
    return this.matchingPattern(value);
};

RefinementType.prototype.and = function(otherRefinement) {
    return new RefinementType(compose(otherRefinement.matchingPattern, this.matchingPattern));
};

RefinementType.prototype.or = function (otherRefinement) {
    var newPattern = value => {
        var firstResult = this.matchingPattern(value);
        var secondResult = otherRefinement.matchingPattern(value);
        if(firstResult !== value) {
            return firstResult;
        }
        if(secondResult !== value) {
            return secondResult;
        }
        return value;
    };

    return new RefinementType(newPattern);
};

RefinementType.prototype.isValid = function (value) {
    return this.matchingPattern(value) === value;
};

RefinementType.empty = function () {
    return new RefinementType(id);
};

function toArray(collection) {
    return [].slice.apply(collection)
}

function compose() {
    var args = toArray(arguments);
    return function (argument) {
        return args.reduceRight(function (acc, func) {
            return func(acc);
        }, argument);
    }
}

function id(a) {
    return a;
}

function memoize (func) {
    var memoArg, memoResult;
    return function (a) {
        if(memoArg !== a) {
            memoArg = a;
            memoResult = func(a);
        }
        return memoResult;

    }
}

export default RefinementType;