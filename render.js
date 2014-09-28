/*
 * hello render test
 *
 * Compile a template to output.js:
 *   node hello.js script_filename.js > output.js
 * 
 * Call this script to render:
 *   node render.js
 */
jsdom = require("jsdom").jsdom;
document = jsdom();
window = document.parentWindow;
$ = require("jquery");

/* Load compiler output */
var template_file = './output.js';
template = require(template_file);

/* Render call */
var el = template('hello');
var output = el.render(document);
console.log(output.html());
