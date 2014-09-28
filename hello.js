var _ = require('underscore');
var Scanner = require('./scanner.js');
var Parser = require('./parser.js');

if (process.argv.length < 3)
    throw "input file required";
var file = process.argv[2];

var scan = new Scanner(file);
var parser = new Parser();

/* Perform async compilation */
scan.read(function(tokens) {
    /* Parse */
    var ast = parser.parse(tokens);
    console.log(ast.js());
});
