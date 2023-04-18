const express=require('express');
const routes=require('./network/routes.js')
const bodyParser=require('body-parser');
const connect=require('./mongodb');
const mongodbUrl='mongodb+srv://helios:28901862@cluster0.saeyk6b.mongodb.net/?retryWrites=true&w=majority';

const app=express(); 

const port=3000; 
const hostIp="172.16.120.254";  //--->IP ETH0 DE COMPUTADORA

app.use(bodyParser.json());
routes(app);
app.use('/home/',express.static('public'));
let hostUrl=`http://${hostIp}:${port}/api/v1/`;

app.listen(port,function(){
console.log(`HTML corriendo en http://${hostIp}:${port}/home/`)
console.log(`SERVER corriendo en http://${hostIp}:${port}/api/v1/`)
});
connect(mongodbUrl);
module.exports=hostUrl;