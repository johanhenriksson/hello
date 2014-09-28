/*
 * AST Node
 * String Element
 */
var string = function(text) {
    return  { 
        type: 'element',
        element: text,
        text: text,

        js: function() {
            return [ 'function() { return Text.make("', this.text, '"); }', ].join('');
        },

        jsVal: function() {
            return ['"', this.text , '"'].join('');
        },
    };
};

module.exports = string;
