_ = require('underscore');

var template = function(name) {
    return {
        type: 'template',
        name: name,
        elements: [ ],
        params: [ ],

        js: function() {
            var code = [ 
                'Element = require("./lib/element.js"); ',
                'Text = require("./lib/text.js"); ',
                'Template = require("./lib/template.js"); ',
                'module.exports = function(', 
            ];
            var params = _.map(this.params, function(param) { return param.name; });
            code.push(this.params.join(', '));
            code.push(') { ');

            code.push('var tpl = Template.make("' + this.name + '"); ');
            code.push('tpl.elements = [ ');
            _.each(this.elements, function(element) {
                code.push('(');
                code.push(element.js());
                code.push(')(');
                code.push(this.params.join(', '));
                code.push('), ');
            }, this);
            code.push(' ]; ');
            code.push('return tpl; ');

            code.push('}; ');
            return code.join('');
        },
    };
};

module.exports = template;
