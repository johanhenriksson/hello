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
                'function() {', 
                'var ', el, ' = Element.make({ element: "', this.element, '" });', 
            ];

            /* Element Attributes */
            code.concat([ el, '.attributes = { ' ]);
            _.each(this.attr, function(value, key) {
                code.concat([ key, ': ', value, ', ']);
            });
            code.push('};');

            /* Child Elements */
            _.each(this.children, function(child) {
                var child_code = [ 
                    el, '.children.push((',
                        child.js(level + 1),
                    ')());',
                ];
                code.push(child_code.join(''));
            });

            /* Return statement */
            code.concat(['return ', el, ';' ]);
            code.push('}');

            return code.join('');;
        },

        print: function() {
            return "Element " + this.element;
        },

        open:  function() { 
            var el_str = this.element;

            var attr_list = [ ];
            _.each(this.attr, function(val_str, key) {
                attr_list.push(key + '="' + val_str.text + '"');
            });

            if (attr_list.length)
                el_str = el_str + ' ' + attr_list.join(' ');
            
            return "<"  + el_str + ">"; 
        },

        close: function() { 
            return "</" + this.element + ">"; 
        },
    };
};

module.exports = element;
