const http=require('http');
const request=require('request');
const PORT=process.env.PORT || 5000;

const server=http.createServer((req,res)=>{
	res.statusCode=200;
	res.setHeader('Content-Type', 'text/plain');
	res.end('Test.');
});
server.listen(PORT,()=>{
  console.log(`Server running on ${PORT}/`);
});

request.cookie('X-CSRF-TOKEN=9BXiDQwpkzax');
request({
	method:'POST',
	url:'https://presence.roblox.com/v1/presence/users',
	form:{'userIds[]':1630227}},
	function(e,r,body){console.log(r.statusCode);})
