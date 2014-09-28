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
                'function() { ',
                'var el = Element.make("text"); ',
                'el.text="', this.text, '"; ',
                'return el; ',
                '}',
            ];
            return code.join('');
        },

        jsVal: function() {
            return ['"', this.text , '"'].join('');
        },

        print: function() {
            return "Text '" + this.text + "'";
        },
        open:  function() { return this.text; },
    };
};

module.exports = string;
