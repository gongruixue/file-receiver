#!/usr/bin/env node
var server = require('../server');

var PORT = process.argv[2] || 8999;
server.listen(PORT, function(){
    console.log('file receiver listening on port ' + PORT);
});