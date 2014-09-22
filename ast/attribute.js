/*
 * AST Node
 * Attribute
 */
var attribute = function(name, value) 
{
    return {
        type: 'attribute',
        name: name,
        value: value,
    };
};
module.exports = attribute;
