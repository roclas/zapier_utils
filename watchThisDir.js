#!/usr/bin/env node

var fs = require('fs'),exec=require('child_process').exec,sys=require('sys');
var logStream = fs.createWriteStream('./app.log', {flags: 'a'});
logStream.write("starting "+__filename+"\n");

var walk = function(dir) {
    var results = [];
    var list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = dir + '/' + file;
        var stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
        	results.push(file);
		results = results.concat(walk(file));
	}
        //else results.push(file);
    })
    return results;
}
var watchPath=function(path){
 fs.watch(path, function (event, filename) {
  var ignores=[/^\./,/^.*log$/];
  for(i in ignores)if(filename.match(ignores[i]))return;
  if (filename) {
    logStream.write(path+'/'+filename+' :'+event );
    if(filename.match(/js$/))exec("./restart_servers.sh", function (error, stdout, stderr) { 
	sys.print('stdout: ' + stdout); sys.print('stderr: ' + stderr); 
	if (error !== null) { logStream.write('exec error: ' + error); }
    });
  } else {
    logStream.write('unknown file modified: '+event);
  }
 });
}

w=walk(".");
w.push(".");
for(e in w){ watchPath(w[e]); }
