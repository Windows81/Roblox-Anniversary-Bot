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
	return new Promise(fulfil=>{
		request.get(`https://www.roblox.com/users/${id}/profile`,(e,r,b)=>{
			var tw=/(\d+)\/(\d+)\/(\d{4})/.exec(b);
			if(!tw){fulfil(null);C=b;return;};
			var y=parseInt(w[3]);
			var m=parseInt(w[1]);
			var d=parseInt(w[2]);
			
			//29 February gets rounded up.
			if(m==2&&d==29)m=3,d=1;
			
			//Returns a YMD-integer-thing.
			y(10000*(tw[3]+10)+100*tw[1]+tw[2]));
		});
	});
}

var userid=1630228,delta=1271;
async function xxx(){
	for(var c=userid;true;c+=delta){
		var jd=await joinD8(c);
		console.log(jd,c);
		if(jd==20081202)break;
	}
}
xxx();
