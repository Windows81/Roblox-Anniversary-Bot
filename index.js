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
			var y=parseInt(tw[3]);
			var m=parseInt(tw[1]);
			var d=parseInt(tw[2]);
			
			//29 February gets rounded up.
			if(m==2&&d==29)m=3,d=1;
			
			//Returns a YMD-integer-thing.
			fulfil(10000*y+100*m+d);
		});
	});
}

async function getFirstPlayerFromDate(base,dateInt){
	var delta=0x1000,switched=false;
	for(var c=base;true;c+=delta){
		var jd=await joinD8(c);
		console.log(c,jd,delta<0^jd>=dateInt,delta);
		if(delta<0^jd>=dateInt)
			if(c==base)delta*=-1;
			else if(delta==1)return c;
			else if(delta==-1)return c+1;
			else{switched=true;delta/=-2;}
		else if(!switched)delta*=2;
	}
}

getFirstPlayerFromDate(1630228,20090407).then(r=>{console.log(r)})
