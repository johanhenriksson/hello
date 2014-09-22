
var tokens = function(list) {
    return {
        index: 0,
        length: list.length,
        tokens: list,

        done: function() {
            return this.index >= this.length;
        },

        next: function() {
            return this.tokens[this.index++];
        },

        peek: function(steps) {
            if (steps === undefined || steps < 1)
                steps = 1;
            return this.tokens[this.index + steps - 1];
        },
    };
};

module.exports = tokens;
