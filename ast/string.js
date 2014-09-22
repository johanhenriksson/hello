/*
 * AST Node
 * String Element
 */
var string = function(text) {
    return  { 
        type: 'element',
        element: text,
        text: text,

        print: function() {
            return "Text '" + this.text + "'";
        },
        open:  function() { return this.text; },
    };
};

module.exports = string;
