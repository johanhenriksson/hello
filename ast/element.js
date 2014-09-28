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
        params: [ ],
        attr: { },

        js: function() 
        {
            /* Create element */
            var code = [ 'function(' ];
            code.push(this.params.join(', '));
            code.push(') { ');
            code.push('var el = Element.make("' + this.element + '"); '); 

            /* Element Attributes */
            var hasAttr = false;
            var attr = [ 'el.attributes = { ' ];
            _.each(this.attr, function(value, key) {
                hasAttr = true;
                attr = attr.concat([ key, ': ', value.jsVal(), ', ']);
            }, this);
            attr.push('}; ');
            if (hasAttr)
                code.push(attr.join(''));

            /* Child Elements */
            var hasChild = false;
            var child_code = [ 'el.children=[' ];
            _.each(this.children, function(child) {
                hasChild = true;
                child_code.push('(');
                child_code.push(child.js());
                child_code.push(')(');
                child_code.push(this.params.join(''));
                child_code.push('), ');
            }, this);
            child_code.push(']; ');
            if (hasChild)
                code.push(child_code.join(''));

            /* Return statement */
            code.push('return el; ');
            code.push('} ');

            return code.join('');;
        },
    };
};

module.exports = element;
