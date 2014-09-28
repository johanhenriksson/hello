Element = require('./element.js');

var template = function(input) 
{
    var el = Element.make({ element: 'div' });
    el.attributes = {
        class: input.class,
    };
    return el;
};

module.exports = template;


