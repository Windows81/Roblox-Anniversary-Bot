const fs=require('fs');
const http=require('http');
const request=require('request');
const Twitter=require('twitter');
const PORT=process.env.PORT||5000;
const CronJob=require('cron').CronJob;
request.cookie('.ROBLOSECURITY=_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_A70C0E6C5770B3F32B976EB7DD3CECFE4906EC1DABCCDD350CCA843EBB2D9EB4D073E3FEBBFF3AAF3292288C64E1895A660183B64A620B2C7E42F65E0DBB648C00FCD5643DC4FA4C642F5EBFE126D20349361305D8D1C9DAF560309483B543B6F650CA4359CA4EFEF8DD34B0C2413985DE3916D6C5783355A94D8C4EC94491EF4125AEB2ACADE83CD1F67706E03C2C6F915A64C319E05C52CCF82D7DB84224E63A16CD0C9FB1A2BF52192872BCA85662E4FECAD4763756E8F75317E5E1A34BB7F1C88F7EBB4757B6E78EAFA5DD912E840CFFFCECBC5B8D15E38E8D0DF7847F9D578D94DFFA187A2C9DF1509D6E2C4C632BE9630302B384A64F7E7316370EA948FF01802682879210A29D63666E78CF9CAB018E1A48DC1397D19F29F7ED73EC51A50C30B615CEA04A83540F76C433B3E4A1A0F92AA81F10B7A90E8CF82A54D30F60CD1AC0');

var C='';
const server=http.createServer((req,res)=>{
	res.statusCode=200;
	res.setHeader('Content-Type', 'text/plain');
	res.end(request.get('https://www.roblox.com/users/1630228/profile'));
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

/*
//Hack me if you can.
const client=new Twitter({
  consumer_key:'zY5y6SW3Bj5zcfUX2feiTJuxs',
  consumer_secret:'0H4huTo7Is0DhsssO9LY2MeJPTVwNpFj1GKuaovzEEXrbtP5Mt',
  access_token_key:'458038971-MIfqHPEw9nXq5hPlpoWWH52bXU5ksDGdQExKJV8y',
  access_token_secret:'Teiibn2h9jENADHOQ176E0dpJVi1VnjpfmL41PACX9tYi'
});

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

//Converts the Date object into a (probably) more efficient integer.
function getDateInt(d){return 10000*d.getFullYear()+100*(1+d.getMonth())+d.getDate();}

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
		var s=`If your user ID is between these two values:\n`+
			`${r[0]} & ${r[1]}\nCongrats on your tenth anniversary on the Rōblox platform!`;
		client.post('statuses/update',{status:s});
	});
}new CronJob('00 59 23 * * *',xxx,null,true,'America/Chicago');
xxx();

setInterval(()=>{},1<<30);
*/
