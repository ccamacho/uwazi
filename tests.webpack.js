require('es6-promise').polyfill();
// require('whatwg-fetch');
require('isomorphic-fetch');
console.error = function(){};
//var context = require.context('./app/react', true, /\.spec\.js$/); //make sure you have your directory and regex test set correctly!
//context.keys().forEach(context)

// test/test_index.js

// This gets replaced by karma webpack with the updated files on rebuild
var __karmaWebpackManifest__ = [];

// require all modules ending in "_test" from the
// current directory and all subdirectories
var testsContext = require.context('./app/react', true, /\.spec\.js$/); //make sure you have your directory and regex test set correctly!

function inManifest(path) {
  return __karmaWebpackManifest__.indexOf(path) >= 0;
}

var runnable = testsContext.keys().filter(inManifest);

// Run all tests if we didn't find any changes
if (!runnable.length) {
  runnable = testsContext.keys();
}

runnable.forEach(testsContext);
