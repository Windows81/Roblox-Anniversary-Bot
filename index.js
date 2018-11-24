const http=require('http');
const PORT=process.env.PORT || 5000;
var c='';
const server=http.createServer((req,res)=>{
  res.statusCode=200;
  res.setHeader('Content-Type', 'text/plain');
  res.end(c);
});
server.listen(PORT,()=>{
  console.log(`Server running on ${PORT}/`);
});

const request = require('request');

request('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY', { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
  c=body.url);
  console.log(body.explanation);
});
