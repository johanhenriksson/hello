
/** hello parser */
var parser = function() {
    return {
        parse: function(scanner) {
            return this.element(scanner);
        },

        /** Parse element */
        element: function(scanner) {
            var tok = scanner.next();
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

            var next = scanner.peek();
            switch(next.type) {
                case 'lbrace': /* Element block! */
                    element.children = this.block(scanner);
                    break;
            }

            return element;
        },

        /** Parse element block */
        block: function(scanner) 
        {
            /* Opening brace */
            var tok = scanner.next();
            if (tok.type !== 'lbrace') 
                throw "How did you get here?";

            var block = [ ];
            while(tok.type !== 'rbrace') {
                switch(tok.type) {
                    case 'id': /* nested element */
                        block.push(this.element(scanner));
                        break;
                }
                tok = scanner.peek();
            }

            scanner.next(); /* Closing brace */
            return block;
        }
    };
}

module.exports = parser;
