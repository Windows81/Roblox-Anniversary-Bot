const http=require('http');
const request=require('request-promise-native');
const PORT=process.env.PORT || 5000;

const server=http.createServer((req,res)=>{
	res.statusCode=200;
	res.setHeader('Content-Type', 'text/plain');
	res.end('Test.');
});
server.listen(PORT,()=>{
  console.log(`Server running on ${PORT}/`);
});

for(var c=1630228;c<1630229;c++){
	console.log(request.get(`https://www.roblox.com/users/${c}/profile`)._rp_promise);
}
