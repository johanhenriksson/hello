ast_element   = require('./ast/element.js');
ast_string    = require('./ast/string.js');
ast_attribute = require('./ast/attribute.js');
ast_template  = require('./ast/template.js');

/** hello parser */
var parser = function() 
{
    return {
        parse: function(tokens) {
            return this.template(tokens);
        },

        template: function(tokens) 
        {
            /* Template Name */
            tokens.accept('func');
            var id = tokens.next();
            var template = new ast_template(id.string);

            /* Parameters */
            template.params = this.parameters(tokens);

            /* Template block */
            tokens.accept('lbrace');
            var token = tokens.peek();
            while(token.type !== 'rbrace') 
            {
                var element = this.element(tokens);

                /* Set element parameters? */
                element.params = template.params;

                /* Push element */
                template.elements.push(element);
                token = tokens.peek();
            }
            tokens.accept('rbrace');

            return template;
        },

        parameters: function(tokens) 
        {
            tokens.accept('lparam');
            var vars = [ ];
            var next = tokens.peek();
            while(next.type !== 'rparam') {
                var decl = this.varDecl(tokens);
                vars.push(decl.name);
                var next = tokens.peek();
            }
            tokens.accept('rparam');
            return vars;
        },

        varDecl: function(tokens) {
            tokens.accept('var');
            var id = tokens.next();
            return {
                type: 'var_decl',
                name: id.string,
            };
        },

        varRef: function(tokens) {
            tokens.accept('var');
            var id = tokens.accept('id');
            return {
                type: 'var_ref',
                name: id.string,
                js: function() {
                    return [ 'function(', this.name, ') { return Text.make(', this.name, '); }' ].join('');
                },
            };
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

                /* Variable Reference */
                case 'var':
                    var ref = this.varRef(tokens);
                    element.children.push(ref);
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
