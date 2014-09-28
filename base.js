_ = require('underscore');

var Base = {
    make: function(opt) {
        return _.extend(Object.create(this), opt || { });
    },
};

module.exports = Base;
