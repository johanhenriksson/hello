$ = require('jquery');

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

module.exports = Text;
