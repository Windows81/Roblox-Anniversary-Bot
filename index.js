const http=require('http');
const req=require('request');
const PORT=process.env.PORT || 5000;

const server=http.createServer((req,res)=>{
	res.statusCode=200;
	res.setHeader('Content-Type', 'text/plain');
	req.post({
		url:'https://presence.roblox.com/v1/presence/users',
		body:'{"userIds":[1630227,1630228]}','content-type':'application/json'},function(e,r,body){console.log(e);})
});
server.listen(PORT,()=>{
  console.log(`Server running on ${PORT}/`);
});
