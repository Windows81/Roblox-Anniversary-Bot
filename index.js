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

function joinD8(id){
	return new Promise((y,n)=>{
		request.get(`https://www.roblox.com/users/${id}/profile`,(e,r,b)=>{
			var tw=/(\d+)\/(\d+)\/(\d{4})/.exec(b);
			if(!tw){y(null);return;};
			
			var d=tw?new Date(tw[3]+'/'+tw[1]+'/'+tw[2]):null;
			//d.setFullYear(d.getFullYear()-10);
			y(d);
		});
	});
}

var id=1630228,d=1000;
async function xxx(){
	for(var c=id;c==id+4;c+=d){
		console.log(await joinD8(c));
	}
}
xxx();
