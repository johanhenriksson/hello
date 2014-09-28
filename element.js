_ = require('underscore');
Base = require('./base.js');

/** Html Element */
var Element = Base.make({
    element: null,
    attributes: { },
    children: [ ],

    append: function(children) {
        this.children = this.children.concat(children); /* hah */
        return this;
    },

    render: function() {
        var elem = $(document.createElement(this.element));
        elem.attr(this.attr);
        _.each(this.children, function(child) {
            elem.append(child.render());
        });
        return elem;
    },

    print: function() {
        console.log('<' + this.element + '>');
        _.each(this.children, function(child) { child.print(); });
        console.log('</' + this.element + '>');
    },
});

module.exports = Element;
