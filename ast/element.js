$ = require('jquery');
_ = require('underscore');

/*
 * AST Node
 * Html Element
 */
var element = function(type) 
{
    return { 
        type: 'element',
        element: type,
        children: [ ],
        attr: { },


        js: function(level) 
        {
            var el = 'el' + level;

            /* Create element */
            var code = [ 
                'function() { ', 
                'var ', el, ' = Element.make("', this.element, '"); ', 
            ];

            /* Element Attributes */
            var hasAttr = false;
            var attr = [ el, '.attributes = { ' ];
            _.each(this.attr, function(value, key) {
                hasAttr = true;
                attr = attr.concat([ key, ': ', value.jsVal(), ', ']);
            });
            attr.push('}; ');
            if (hasAttr)
                code.push(attr.join(''));

            /* Child Elements */
            var hasChild = false;
            var child_code = [ el, '.children=[' ];
            _.each(this.children, function(child) {
                hasChild = true;
                child_code.push('(');
                child_code.push(child.js(level + 1));
                child_code.push(')(), ');
            });
            child_code.push(']; ');
            if (hasChild)
                code.push(child_code.join(''));

            /* Return statement */
            code.push([ 'return ', el, '; ' ].join(''));
            code.push('} ');

            return code.join('');;
        },
    };
};

module.exports = element;
