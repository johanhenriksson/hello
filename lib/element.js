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
        /* Special case: text elements */
        if (this.element == 'text')
            return $(document.createTextNode(this.text));

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

var Text = 
{
    text: "",
    render: function(document) {
        return $(document.createTextNode(this.text));
    },
    make: function(text) {
        var elem = Object.create(Text);
        elem.text = text;
        return elem;
    },
};

module.exports = Element;
