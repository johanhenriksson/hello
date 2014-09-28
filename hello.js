var _ = require('underscore');
var Scanner = require('./scanner.js');
var Parser = require('./parser.js');

if (process.argv.length < 3)
    throw "input file required";
var file = process.argv[2];

var scan = new Scanner(file);
var parser = new Parser();

function print_ast(ast, level) {
    if (level === undefined)
        level = 0;

    var space = "";
    for (var i = 0; i < level * 2; i++)
        space += " ";

    /* Print node */
    if (ast.open)
        console.log(space + ast.open());

    /* Print children */
    if (ast.children !== undefined) {
        _.each(ast.children, function(child) {
            print_ast(child, level + 1);
        });
    }

    if (ast.close)
        console.log(space + ast.close());
}

/* Perform async compilation */
scan.read(function(tokens) {
    /* Parse */
    var ast = parser.parse(tokens);
    var code = [
        "var Element = require('./element.js'); ",
        'module.exports = ', ast.js(), ';',
     ];
    console.log(code.join(''));
});
