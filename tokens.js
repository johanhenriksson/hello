
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

        accept: function(type) 
        {
            var token = this.peek();
            if (token.type !== type)
                throw "Expected " + type + ", got " + token.type;
            return this.next();
        },

        peek: function(steps) {
            if (steps === undefined || steps < 1)
                steps = 1;
            return this.tokens[this.index + steps - 1];
        },
    };
};

module.exports = tokens;
