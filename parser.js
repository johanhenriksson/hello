
/** hello parser */
var parser = function() {
    return {
        parse: function(tokens) {
            return this.element(tokens);
        },

        /** Parse element */
        element: function(tokens) {
            var tok = tokens.next();
            if (tok.type !== 'id')
                throw "Element type identifier expected";

            var element = { 
                type: tok.string,
                children: [ ],
                print: function() {
                    return "Element " + this.type;
                },
                open:  function() { return "<"  + this.type + ">"; },
                close: function() { return "</" + this.type + ">"; },
            };

            var next = tokens.peek();
            switch(next.type) {
                case 'lparam': /* Param block */
                    tokens.next(); // throw (
                    element.class = this.string(tokens);
                    tokens.next(); // throw )
                    break;
                case 'lbrace': /* Element block */
                    element.children = this.block(tokens);
                    break;
                case 'string': /* Text element */
                    element.children = [ this.string(tokens) ];
                    break;
                case 'id': /* Single child */
                    element.children = [ this.element(tokens) ];
                    break;
            }

            return element;
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
            /* Opening brace */
            var tok = tokens.next();
            if (tok.type !== 'lbrace') 
                throw "How did you get here?";

            var block = [ ];
            while(tok.type !== 'rbrace') {
                switch(tok.type) {
                    case 'id': /* nested element */
                        block.push(this.element(tokens));
                        break;
                }
                tok = tokens.peek();
            }

            tokens.next(); /* Closing brace */
            return block;
        }
    };
}

module.exports = parser;
