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

        render: function(document) {
            var element = document.createElement(this.element);

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

        js: function() {
            var f = function() {
            };
        },
    };
};

module.exports = element;
