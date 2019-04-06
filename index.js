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

async function iter88(){
	for(var c=1630228;c<=1630330;c++){
		await request.get(`https://www.roblox.com/users/${c}/profile`,(e,r,b)=>{
			var tw=/href="https:\/\/twitter.com\/(\w+)/.exec(b);
			if(tw)console.log(tw[1]);
		})._rp_promise;
	}
}
iter88();
