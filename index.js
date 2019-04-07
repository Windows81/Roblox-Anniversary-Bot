const fs=require('fs');
const http=require('http');
const request=require('request');
const Twitter=require('twitter');
const PORT=process.env.PORT||5000;
const CronJob=require('cron').CronJob;

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

//Hack me if you can.
const client=new Twitter({
  consumer_key:'zY5y6SW3Bj5zcfUX2feiTJuxs',
  consumer_secret:'0H4huTo7Is0DhsssO9LY2MeJPTVwNpFj1GKuaovzEEXrbtP5Mt',
  access_token_key:'458038971-MIfqHPEw9nXq5hPlpoWWH52bXU5ksDGdQExKJV8y',
  access_token_secret:'Teiibn2h9jENADHOQ176E0dpJVi1VnjpfmL41PACX9tYi'
});

const cache={};
function clearCache(){cache.length=0}
async function getFirstPlayerFromDate(base,dateInt){
	var delta=0x1000,s=false;
	for(var c=base;true;c+=delta){
		
		//Repeatedly searches for nearby IDs until a join date is found.
		var jd;do jd=cache[c]?cache[c]:await joinD8(c);while(!jd&&c--);
		
		cache[c]=jd;
		if(delta<0^jd>=dateInt)
			if(c==base)delta*=-1;
			else if(delta==1)return c;
			else if(delta==-1)return c+1;
			else{s=true;delta/=-2;}
		else if(!s)delta*=2;
		//console.log(c,jd);
	}
}

var base=1630228;
function xxx(){
	const d=new Date();
	const n=d.getFullYear()+100*(1+d.getMonth())+d.getDate()
	getFirstPlayerFromDate(base,n).then(r=>{console.log(d,base=r)})
	client.post('statuses/update',{status:'I am a Tweet Tweet BİRD!'});
}new CronJob('00 59 23 * * *',xxx,null,true,'America/Chicago');
xxx();

setInterval(()=>{},1<<30);
