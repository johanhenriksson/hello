_ = require('underscore');

var Base = {
    make: function(opt) {
        return Object.create(this);
    },
};

module.exports = Base;
