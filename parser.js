element = require('./elements/element.js');

/** hello parser */
var parser = function() 
{
    return {
        parse: function(tokens) {
            return this.element(tokens);
        },

        /** Parse element */
        element: function(tokens) {
            var tok = tokens.next();
            if (tok.type !== 'id')
                throw "Element parse error: type identifier expected";

            var el = new element(tok.string);
            var next = tokens.peek();
            switch(next.type) {
                case 'lparam': /* Param block */
                    tokens.accept('lparam'); 
                    el.class = this.string(tokens);
                    console.log('class ' + el.class);
                    tokens.next('rparam'); 
                    break;
                case 'lbrace': /* Element block */
                    el.children = this.block(tokens);
                    break;
                case 'string': /* Text element */
                    el.children = [ this.string(tokens) ];
                    break;
                case 'id': /* Single child */
                    el.children = [ this.element(tokens) ];
                    break;
            }

            return el;
        },

        string: function(tokens) 
        {
            var tok = tokens.next();
            if (tok.type != 'string')
                throw "Expected string";

            /* Return text literal */
            return  { 
                type: 'text',
                text: tok.string,
                children: [ ],
                print: function() {
                    return "Text '" + this.text + "'";
                },
                open:  function() { return this.text; },
                close: function() { return ""; },
            };
        },

        /** Parse element block */
        block: function(tokens) 
        {
            tokens.accept('lbrace');

            var block = [ ];
            var token = tokens.peek();
            while(token.type !== 'rbrace') {
                switch(token.type) {
                    case 'id': /* nested element */
                        block.push(this.element(tokens));
                        break;
                    default:
                        console.log('block weird ' + tok.type);
                        break;
                }
                token = tokens.peek();
            }

            tokens.accept('rbrace');
            return block;
        }
    };
}

module.exports = parser;
