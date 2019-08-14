const fs=require('fs');
const http=require('http');
const request=require('request');
const Twitter=require('twitter');
const PORT=process.env.PORT||5000;
const CronJob=require('cron').CronJob;
process.env.TZ='America/Chicago'

var C='';
const server=http.createServer((req,res)=>{
	res.statusCode=200;
	res.setHeader('Content-Type', 'text/plain');
	res.end(C);
});
server.listen(PORT,()=>{
  console.log(`Server running on ${PORT}/`);
});

//Hack me if you can.
const client=new Twitter({
  consumer_key:'mp5WNHNfQODdZwfWDMRz5naLn',
  consumer_secret:'MeChkBvcPuH8CebYHQWVr31OXUGbhhJ0dihKAmGO5RY1SQmegU',
  access_token_key:'1161699869095915521-EL5D3mA86cQjutEkXnBh9IHQGLBsFP',
  access_token_secret:'c0WoCHld6sR3Qlhc2p9WdHN31mNHMeO5FIJRPn0Gof8dJ'
});

//Converts the Date object into an integer and vice-versa.
function getDateInt(d){return 10000*d.getFullYear()+100*(1+d.getMonth())+d.getDate();}
function getDateStr(d){return~~(d/100%100)+'/'+d%100+'/'+~~(d/10000);}

const twCache={};
function getSalientUsers(d){
	return new Promise(rs=>{
		var url=`https://www.bing.com/search?q=site:https://www.`+
			`roblox.com/users%20%22join%20date%20${getDateStr(d)}%22&first=`;
		var count=0,arr=[];

		//Iterates multiple pages worth of Bing search results.
		for(var c=0;c<4;c++)request.get(url+(c*10+1),(e,r,b)=>{
			var m=b.match(/users\/(\d+)\/profile/g);
			count+=m.length;
			
			//Progressively adds the IDs into the array.
			for(var mI=0,s=m[0];mI<m.length;s=m[++mI])
				arr.push(parseInt(s.substring(6,s.length-6)));
			if(arr.length==count)rs(arr);
		});
	});
}

function getTwitter(id){
	var t={url:`https://www.roblox.com/users/${id}/profile`,
		headers:{Cookie:'.ROBLOSECURITY='+process.env.roblosecurity}};
	return new Promise(rs=>{
		if(twCache[id]!=null)rs(twCache[id]?twCache[id]:null);
		else request.get(t,(e,r,b)=>{
			var mt=/=https:\/\/twitter\.com\/([^ ]+)/.exec(b);
			twCache[id]=mt?mt[1]:0;
			rs(mt?'@'+mt[1]:null);
		});
	});
}

async function getTwitters(d,range){
	var a=await getSalientUsers(d),twA=[];
	for(var c=0,id=a[0];c<a.length;id=a[++c]){
		
		//Skip if the ID doesn't seem to fit the date.
		if(range&&(id<range[0]||id>range[1]))continue;
		
		var tw=await getTwitter(id);
		console.log(id,tw);
		if(tw)twA.push(tw);
	}
	return twA;
}

function joinD8(id){
	return new Promise(rs=>{
		request.get(`https://www.roblox.com/users/${id}/profile`,(e,r,b)=>{
			var mt=/(\d+)\/(\d+)\/(\d{4})/.exec(b);
			if(!mt){rs(null);return;}
			var y=parseInt(mt[3]);
			var m=parseInt(mt[1]);
			var d=parseInt(mt[2]);
			
			//29 February gets rounded up.
			if(m==2&&d==29)m=3,d=1;
			
			//Returns a YMD-integer-thing.
			rs(10000*y+100*m+d);
		});
	});
}

const jdCache={};
async function getPlayerDateRange(base,dateInt){
	var delta=0x1000,s=false;
	var min=base,max=base;
	for(var c=base;true;c+=delta){
		
		//Repeatedly searches for nearby IDs until a join date is found.
		var jd;do jdCache[c]=jd=jdCache[c]?jdCache[c]:await joinD8(c);while(!jd&&(c+=Math.sign(delta)));
		console.log(c,jd);
		
		//Stores the highest value found for the date.
		if(jd==dateInt&&max<c)max=c;
		
		if(delta<0^jd>=dateInt)
			if(c==base)delta*=-1;
			else if(delta==1){min=c;break;}
			else if(delta==-1){min=c+1;break;}
			else{s=true;delta/=-2;}
		else if(!s)delta*=2;
	}console.log('Range start reached.');
	
	//Now determine the max value in the range.
	delta=0x1000;for(var c=max;true;c+=delta){
		
		//Repeatedly searches for nearby IDs until a join date is found.
		var jd;do jdCache[c]=jd=jdCache[c]?jdCache[c]:await joinD8(c);while(!jd&&(c+=Math.sign(delta)));
		console.log(c,jd);
		
		if(delta<0^jd>dateInt)
			if(c==base)delta*=-1;
			else if(delta==1){max=c-1;break;}
			else if(delta==-1){max=c;break;}
			else{s=true;delta/=-2;}
		else if(!s)delta*=2;
	}console.log('Range finish reached.');
	
	//Return the range.
	return[min,max];
}

var base=parseInt(process.env.baseUID);
async function xxx(){
	const d=new Date();
	d.setFullYear(d.getFullYear()-10);
	const n=getDateInt(d);
	
	getPlayerDateRange(base,n).then(async r=>{
		var twA=await getTwitters(n,r);
		console.log(d,r[0],r[1],twA.length);
		base=process.env.baseUID=r[1];
		var s=`If your Rōblox user ID is between these two values:\n`+
			`${r[0]} ‒ ${r[1]}\n\nCongratulations for having reached ten years on Rōblox!`;
		var reply;
		if(twA.length>0){
			var comb=s+(reply='\nHonourable Mentions: '+twA.join(', '));
			if(comb.length<180)s=comb,reply=null;
		}
		s+='\n\nThis Tweet was automatically generated, but you can still provide feedback.\n#HappyTennerdom'
		client.post('statuses/update',{status:C=s},(e,t,r)=>{
			if(e)console.warn(e);
			else if(reply)
				client.post('statuses/update',{status:reply,in_reply_to_status_id:t.id_str})
		});
	});
}
new CronJob('0 0 * * *',xxx).start();
xxx();

setInterval(()=>{
	var url1='https://the-tenth-anniversaries.herokuapp.com/';
	var url2='https://tenth-anniversaries.herokuapp.com/';
	request.get(new Date().getDate()>15?url1:url2);
},69000);
