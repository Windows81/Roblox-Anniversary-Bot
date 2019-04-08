const fs=require('fs');
const http=require('http');
const request=require('request');
const Twitter=require('twitter');
const PORT=process.env.PORT||5000;
const CronJob=require('cron').CronJob;

/*
var C='';
const server=http.createServer((req,res)=>{
	res.statusCode=200;
	res.setHeader('Content-Type', 'text/plain');
	res.end(C);
});
server.listen(PORT,()=>{
  console.log(`Server running on ${PORT}/`);
});
*/

//Hack me if you can.
const client=new Twitter({
  consumer_key:'zY5y6SW3Bj5zcfUX2feiTJuxs',
  consumer_secret:'0H4huTo7Is0DhsssO9LY2MeJPTVwNpFj1GKuaovzEEXrbtP5Mt',
  access_token_key:'458038971-MIfqHPEw9nXq5hPlpoWWH52bXU5ksDGdQExKJV8y',
  access_token_secret:'Teiibn2h9jENADHOQ176E0dpJVi1VnjpfmL41PACX9tYi'
});}

//Converts the Date object into an integer and vice-versa.
function getDateInt(d){return 10000*d.getFullYear()+100*(1+d.getMonth())+d.getDate();}
function getDateStr(d){return~~(d/100%100)+'/'+d%100+'/'+~~(d/10000);}

function getTwitter(id){
	var t={url:`https://www.roblox.com/users/${id}/profile`,
		headers:{Cookie:'.ROBLOSECURITY='+process.env.roblosecurity}};
	return new Promise(fulfil=>{
		request.get(t,(e,r,b)=>{
			var mt=/=https:\/\/twitter\.com\/([^ ]+)/.exec(b);
			fulfil(mt?mt[1]:null);
		});
	});
}
			    
function getSalientUsers(d){
	d=getDateStr(d);
}

function joinD8(id){
	return new Promise(fulfil=>{
		request.get(`https://www.roblox.com/users/${id}/profile`,(e,r,b)=>{
			var mt=/(\d+)\/(\d+)\/(\d{4})/.exec(b);
			if(!mt){fulfil(null);return;}
			var y=parseInt(mt[3]);
			var m=parseInt(mt[1]);
			var d=parseInt(mt[2]);
			
			//29 February gets rounded up.
			if(m==2&&d==29)m=3,d=1;
			
			//Returns a YMD-integer-thing.
			fulfil(10000*y+100*m+d);
		});
	});
}

const cache={};
function clearCache(){cache.length=0}
async function getPlayerDateRange(base,dateInt){
	var delta=0x1000,s=false;
	var min=base,max=base;
	for(var c=base;true;c+=delta){
		
		//Repeatedly searches for nearby IDs until a join date is found.
		var jd;do cache[c]=jd=cache[c]?cache[c]:await joinD8(c);while(!jd&&c--);
		
		//Stores the highest value found for the date.
		if(jd==dateInt&&max<c)max=c;
		
		if(delta<0^jd>=dateInt)
			if(c==base)delta*=-1;
			else if(delta==1){min=c;break;}
			else if(delta==-1){min=c+1;break;}
			else{s=true;delta/=-2;}
		else if(!s)delta*=2;
		console.log(jd,c,delta);
	}
	
	//Now determine the max value in the range.
	delta=0x1000;for(var c=max;true;c+=delta){
		
		//Repeatedly searches for nearby IDs until a join date is found.
		var jd;do cache[c]=jd=cache[c]?cache[c]:await joinD8(c);while(!jd&&c--);
		
		if(delta<0^jd>dateInt)
			if(c==base)delta*=-1;
			else if(delta==1){max=c-1;break;}
			else if(delta==-1){max=c;break;}
			else{s=true;delta/=-2;}
		else if(!s)delta*=2;
		console.log(jd,c,delta);
	}
	
	//Return the range.
	return[min,max];
}

var base=parseInt(process.env.baseUID);
console.log(base);
function xxx(){
	const d=new Date();
	d.setFullYear(d.getFullYear()-10);
	const n=getDateInt(d);
	console.log(n);
	getPlayerDateRange(base,n).then(r=>{
		console.log(d,r[0],r[1]);
		base=process.env.baseUID=r[1];
		var s=`If your user ID is between these two values:\n\n`+
			`${r[0]} ‒ ${r[1]}\n\nCongrats on your tenth anniversary on the Rōblox platform!`;
		client.post('statuses/update',{status:s});
	});
}new CronJob('00 59 23 * * *',xxx,null,true,'America/Chicago');
xxx();

setInterval(()=>{},1<<30);
