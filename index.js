const fs=require('fs');
const http=require('http');
const request=require('request');
const PORT=process.env.PORT || 5000;

var C='';
const server=http.createServer((req,res)=>{
	res.statusCode=200;
	res.setHeader('Content-Type', 'text/plain');
	res.end(C);
});
server.listen(PORT,()=>{
  console.log(`Server running on ${PORT}/`);
});

var id=1630228,d=1000;
/*
async function xxx(){
	for(var c=id;c<=id;c++){
		request.get(`https://www.roblox.com/users/${c}/profile`,(e,r,b)=>{
			var tw=/(\d+)\/(\d+)\/(\d{4})/.exec(b);
			var d=tw?new Date(tw[3]+'/'+tw[1]+'/'+tw[2]):null;
			if(tw)C=tw[0];console.log(d);
		});
	}
}
xxx();
*/

var sys = require('sys')
var exec = require('child_process').exec;
var child;
// executes `pwd`
child = exec("pwd", function (error, stdout, stderr) {
  sys.print('stdout: ' + stdout);
  sys.print('stderr: ' + stderr);
  if (error !== null) {
    console.log('exec error: ' + error);
  }
});
