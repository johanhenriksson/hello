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
    console.log(space + ast.open());

    /* Print children */
    if (ast.children.length > 0) {
        _.each(ast.children, function(child) {
            print_ast(child, level + 1);
        });
    }

    var close = ast.close();
    if (close.length > 0)
        console.log(space + ast.close());
}

/* Perform async compilation */
scan.read(function(tokens) {
    /* Parse */
    var ast = parser.parse(tokens);
    print_ast(ast);
});
