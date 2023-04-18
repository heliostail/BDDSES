const bd=require('mongoose');
bd.Promise=global.Promise

async function connect(url){
    bd.connect(url,{
        useNewUrlParser: true,
    })
    console.log('[Mongodb] conectado')
}

module.exports=connect