
var element = function(type) {
    return { 
        type: type,
        children: [ ],

        print: function() {
            return "Element " + this.type;
        },

        open:  function() { 
            if (this.class)
                return '<' + this.type + 'class="' + this.class + '">';
            return "<"  + this.type + ">"; 
        },

        close: function() { 
            return "</" + this.type + ">"; 
        },
    };
};

module.exports = element;
