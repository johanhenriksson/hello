$ = require('jquery');
_ = require('underscore');

var Template = 
{
    name: '',
    elements: [ ],

    render: function(document, data) {
        var el = $(document.createElement('div'));
        _.each(this.elements, function(element) {
            el.append(element.render(document, data));
        }, this);
        return el;
    },

    make: function(name, elements) 
    {
        var tpl = Object.create(Template);
        tpl.name = name;
        tpl.elements = elements;
        return tpl;
    },
};

module.exports = Template;
