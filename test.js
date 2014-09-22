_    = require('underscore');
fs   = require('fs');
path = require('path');

var parse_test = path.join(__dirname, 'test/parser');
var ast_test   = path.join(__dirname, 'test/ast');

/** Async test suite */
function run_tests(test_path)
{
    fs.readdir(test_path, function(err, files) 
    {
        if (err)
            throw "Read error: " + err;
        
        _.each(files, function(file) {
            var ext = path.extname(file);
            if (ext === '.hi') {
                var basename = path.basename(file, ext);
                var expectedPath = path.join(test_path, basename + '.expct');
                fs.readFile(expectedPath, function(err, data) {
                    /* We've got the desired output */
                });
            }
        });
    });
};

/* Run parser tests */
// run_tests(parse_test);

/* Run AST tests */
run_tests(ast_test);
