ast_element   = require('./ast/element.js');
ast_string    = require('./ast/string.js');
ast_attribute = require('./ast/attribute.js');

/** hello parser */
var parser = function() 
{
    return {
        parse: function(tokens) {
            return this.element(tokens);
        },

        /** Parse element */
        element: function(tokens) 
        {
            var token   = tokens.accept('id');
            var element = new ast_element(token.string);

            var next = tokens.peek();
            
            /* Parameter */
            if (next === 'lparam') {
                tokens.accept('lparam'); 
                element.class = this.string(tokens);
                console.log('class ' + el.class);
                tokens.next('rparam'); 
            }

            switch(next.type) 
            {
                /* Element block */
                case 'lbrace': 
                    var rows = this.block(tokens);
                    _.each(rows, function(row) {
                        if (row.type == 'element')
                            element.children.push(row);
                        if (row.type == 'attribute')
                            element.attr[row.name] = row.value;
                    });
                    break;

                /* Text element */
                case 'string': 
                    element.children = [ this.string(tokens) ];
                    break;

                /* Nested inline element */
                case 'id': 
                    element.children = [ this.element(tokens) ];
                    break;
            }

            return element;
        },

        string: function(tokens) 
        {
            var token = tokens.accept('string');
            return new ast_string(token.string);
        },

        /** Parse element block */
        block: function(tokens) 
        {
            tokens.accept('lbrace');

            var block = [ ];
            var token = tokens.peek();
            while(token.type !== 'rbrace') {
                block.push(this.row(tokens));
                token = tokens.peek();
            }

            tokens.accept('rbrace');
            return block;
        },

        row: function(tokens)
        {
            /* Need to peek ahead two tokens to determine if its an element or an attribute row */
            var current = tokens.peek(1);
            var next    = tokens.peek(2);

            switch(current.type)
            {
                /* ID or Attribute */
                case 'id': 
                    if (next.type === 'assign') 
                        /* Attribute */
                        return this.attribute(tokens);
                    else
                        /* Element */
                        return this.element(tokens);

                /* Plaintext element */
                case 'string':
                    return this.string(tokens);
            }

            throw "Block row parse error: Unexpected token " + current.type;
        },

        attribute: function(tokens)
        {
            var token = tokens.accept('id');
            var name  = token.string;
            tokens.accept('assign');
            var value = this.string(tokens);

            return new ast_attribute(name, value);
        }
    };
}

module.exports = parser;
