_ = require('underscore');
$ = require('jquery');

/** Html Element */
var Element = {
    element: null,
    attributes: { },
    children: [ ],

    append: function(child) {
        console.log('child: %j', child);
        this.children.push(child); 
        return this;
    },

    set: function(attr) {
        this.attributes = _.extend(this.attributes, attr);
        return this;
    },

    render: function(document) 
    {
        if (this.element == 'text')
            return $(document.createTextNode(this.text));

        var elem = $(document.createElement(this.element));

        elem.attr(this.attributes);
        _.each(this.children, function(child) {
            elem.append(child.render(document));
        });
        return elem;
    },

    print: function() {
        console.log('<' + this.element + '>');
        if (this.children);
            _.each(this.children, function(child) { child.print(); });
        console.log('</' + this.element + '>');
    },

    make: function(type) {
        var elem = Object.create(Element);
        elem.element = type;
        return elem;
    },
};

module.exports = Element;
