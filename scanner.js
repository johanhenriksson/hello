fs = require('fs');
_ = require('underscore');
tokens = require('./tokens.js');

function isEmpty(str) {
    return str.replace(/^\s+|\s+$/g, '').length == 0;
}

/** hello scanner */
var scanner = function(file) {
    return {
        path: file,
        index: 0,
        length: 0,

        /** Read source file */
        read: function(callback) {
            fs.readFile(this.path, 'utf8', _.bind(function(err, data) {
                if (err)
                    return console.log('FS error: ' + err);

                callback(this.scan(data));
            }, this));
        },

        scan: function(text) 
        {
            var list = [ ];
            this.index = 0,
            this.text  = text;
            this.length = text.length;

            while(this.index < this.length) 
            {
                var c = this.text[this.index++]; 
                var chars = [ ];
                
                /* Skip whitespace */
                while (isEmpty(c))
                    c = text[this.index++]; 

                /* String literals */
                if (c === '"') {
                    list.push(this.scan_string());
                }
                else {
                    /* Read until next whitespace */
                    while (!isEmpty(c)) {
                        chars.push(c);
                        c = text[this.index++]; 
                    }

                    var str = chars.join('');
                    list.push({
                        string: str,
                        type: this.__getType(str),
                    });
                }
            }

            return new tokens(list);
        },

        /** Scan string literal */
        scan_string: function() 
        {
            var chars = [ ], p = '';

            var c = this.text[this.index++];
            while(!(c === '"') && (p !== '\\')) {
                chars.push(c);
                p = c;
                c = this.text[this.index++];
            }

            /* Return string literal token */
            return {
                string: chars.join(''),
                type: 'string',
            };
        },

        /** Attempt to resolve token type */
        __getType: function(str) {
            switch(str) {
                case '': return 'empty';
                case '{': return 'lbrace';
                case '}': return 'rbrace';
            }

            /* Identifier */
            var re = /[a-zA-Z][a-zA-Z0-9]*/;
            if (re.test(str)) 
                return 'id';

            throw "Unknwon token: " + str;
        }
    };
}


module.exports = scanner;
