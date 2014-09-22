fs = require('fs');
_ = require('underscore');

function isEmpty(str) {
    return str.replace(/^\s+|\s+$/g, '').length == 0;
}

/** hello scanner */
var scanner = function(file) {
    return {
        path: file,
        text: "",
        index: 0,
        length: 0,

        /** Read source file */
        read: function(callback) {
            fs.readFile(this.path, 'utf8', _.bind(function(err, data) {
                if (err)
                    return console.log('FS error: ' + err);
                this.text = data;
                this.length = data.length;

                callback(this);
            }, this));
        },

        done: function() {
            return this.index >= this.length;
        },

        next: function() {
            return this.__readToken();
        },

        peek: function() {
            var i = this.index;
            var tok = this.__readToken();
            this.index = i;
            return tok;
        },

        __readToken: function() 
        {
            var c = this.text[this.index++]; 
            var chars = [ ];
            
            /* Skip whitespace */
            while (isEmpty(c))
                c = this.text[this.index++]; 

            /* Read until next whitespace */
            while (!isEmpty(c)) {
                chars.push(c);
                c = this.text[this.index++]; 
            }

            var str = chars.join('');
            var type = this.__getType(str);

            /* Return token */
            return {
                string: str,
                type: type,
            }
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
