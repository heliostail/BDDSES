//MODULOS
const express=require('express');
const response=require('../../network/response');
const controller=require('./controller');
//ROUTER
const routerProyecto=express.Router();
//LISTA DE PROYECTOS
// const listaProyectos=[];
//METODOS
// routerProyecto.get('/',function(req,res){
//     controller.getProyecto().then(sitesList=>listaProyectos.push(sitesList)).then(()=>
//         response.success(res,listaProyectos,200)).then(()=>console.log(listaProyectos)).catch(error=>{
//         response.error(res,error,400,'unexpected error');
//     });    
// });
routerProyecto.get('/',function(req,res){
    controller.getProyecto().then(proyectoList=>
        response.success(res,proyectoList,200)).catch(error=>{
        response.error(res,error,400,'unexpected error');
    });    
});
routerProyecto.post('/',function(req,res){
    const data=req.body;
    controller.postProyecto(data).then(result=>
        response.success(res,result,200)).catch(error=>{
        response.error(res,error,400,'unexpected error');    
    });
});
routerProyecto.delete('/:idProyecto',function(req,res){
    const {idProyecto}=req.params;
    controller.deleteProyecto(idProyecto).then(result=>
        response.success(res,result,200)).catch(error=>{
        response.error(res,error,400,'unexpected error');    
    });
});
routerProyecto.patch('/',function(req,res){
    const data=req.body;
    const idProyecto=data._id;
    controller.patchProyecto(idProyecto,data).then(result=>
        response.success(res,result,200)).catch(error=>{
        response.error(res,error,400,'unexpected error');    
    });
})


//EXPORTADOS
module.exports=routerProyecto;