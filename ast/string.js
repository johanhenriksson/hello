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
            var code = [
                'function() { return Element.make({ element: "text", text: "', this.text, '" }); }',
            ];
            return code.join('');
        },

        print: function() {
            return "Text '" + this.text + "'";
        },
        open:  function() { return this.text; },
    };
};

module.exports = string;
