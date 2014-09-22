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

        delimiters: [
            ' ', '\t', '\n', '{', '}', '(', ')',
        ],

        /** Read source file */
        read: function(callback) {
            fs.readFile(this.path, 'utf8', _.bind(function(err, data) {
                if (err)
                    return console.log('FS error: ' + err);

                callback(this.scan(data));
            }, this));
        },

        next: function() {
            return this.text[this.index++];
        },

        peek :function(steps) {
            if (steps === undefined || steps < 1)
                steps = 1;
            return this.text[this.index + steps - 1];
        },

        scan: function(text) 
        {
            var list = [ ];
            this.index = 0,
            this.text  = text;
            this.length = text.length;

            while(this.index < this.length) {
                this.scan_whitespace();
                list.push(this.scan_token());
            }

            console.log('scan completed');
            return new tokens(list);
        },

        scan_token: function()
        {
            var c = this.peek();
            switch(c) {
                case '"':
                    console.log('string literal');
                    return this.scan_string();

                case '{': return this.scan_terminal('lbrace');
                case '}': return this.scan_terminal('rbrace');
                case '(': return this.scan_terminal('lparam');
                case ')': return this.scan_terminal('rparam');
            }

            return this.scan_id();
        },

        scan_terminal: function(name) {
            this.next();
            return { type: name };
        },

        scan_id: function() 
        {
            var c, chars = [ ];
            while (this.index < this.length) 
            {
                c = this.peek();
                if (_.contains(this.delimiters, c)) 
                    break;
               
                chars.push(this.next());
            }

            var str = chars.join('');
            return {
                string: str,
                type: 'id'
            };
        },

        /** Scan (and discard) whitespace */
        scan_whitespace: function() {
            var c = this.peek();
            while (this.isWhitespace(c)) {
                this.next(); // discard
                c = this.peek();
            }
        },

        isWhitespace: function(c) {
            return c === ' ' || c === '\t' || c === '\r' || c === '\n';
        },

        /** Scan string literal */
        scan_string: function() 
        {
            var chars = [ ], p = '';

            this.next(); // discard "
            var c = this.next();
            while(!(c === '"') && (p !== '\\')) {
                chars.push(c);
                p = c;
                c = this.next();
            }

            /* Return string literal token */
            return {
                string: chars.join(''),
                type: 'string',
            };
        },
    };
}

module.exports = scanner;
