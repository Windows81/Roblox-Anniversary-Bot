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

//request.cookie();
request.get('https://www.roblox.com/users/1630228/profile').on('body',b=>{console.log('YAYAYAYAYYA!'+b.length);})
