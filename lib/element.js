_ = require('underscore');
$ = require('jquery');

/** Html Element */
var Element = 
{
    element: null,
    attributes: { },
    children: [ ],

    render: function(document) 
    {
        /* Create HTML element */
        var elem = $(document.createElement(this.element));

        /* Set attributes */
        elem.attr(this.attributes);

        /* Render & attach children */
        _.each(this.children, function(child) {
            elem.append(child.render(document));
        });
        return elem;
    },

    /* Create a new Element */
    make: function(type) {
        var elem = Object.create(Element);
        elem.element = type;
        return elem;
    },
};

module.exports = Element;
