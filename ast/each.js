_ = require('underscore');

var each = {
    type: 'each',
    collection: 'items',
    iterator: 'item',
    elements: [ ],

    js: function(level) 
    {
        /* Foreach Statement */
        var code = [
            '_.each(',
            this.collection, ', ',
            'function(', this.iterator, ') {',
        ];

        /* Elements */
        _.each(this.elements, function(element) {
            var el_code = [ '(' ]; 
            el_code.concat(element.js(level + 1));
            el_code.push(')();');
            code.concat(el_code);
        });

        /* Close block */
        code.push('});');

        return code.join('');
    },
};

module.exports = each;
