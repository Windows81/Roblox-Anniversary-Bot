const http=require('http');
const request = require('axios');
const PORT=process.env.PORT || 5000;

const server=http.createServer((req,res)=>{
  res.statusCode=200;
  res.setHeader('Content-Type', 'text/plain');
  res.end(request!=null?'1':'0');
});
server.listen(PORT,()=>{
  console.log(`Server running on ${PORT}/`);
});
