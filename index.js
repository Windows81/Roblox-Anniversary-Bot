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

async function iter88(){
	for(var c=1630228;c<=1630228;c++){
		request.get(`https://www.roblox.com/users/${c}/profile`,(e,r,b)=>{
			var tw=/href="twitter.com\/(\w+) target=_blank/.exec(C=b);
			if(tw)console.log(tw[1]);else console.log(c);
		});
	}
}
iter88();
