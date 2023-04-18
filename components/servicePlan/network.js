//MODULOS
const express=require('express');
const response=require('../../network/response');
const controller=require('./controller');
//ROUTER
const routerServicePlan=express.Router();
//MODULOS

routerServicePlan.get('/',function(req,res){
    controller.getServicePlan().then(servicePlanList=>
        response.success(res,servicePlanList,200)).catch(error=>{
        response.error(res,error,400,'unexpected error');
    });    
});
routerServicePlan.post('/',function(req,res){
    const data=req.body;
    controller.postProyecto(data).then(result=>
        response.success(res,result,200)).catch(error=>{
        response.error(res,error,400,'unexpected error');    
    });
});
// routerProyecto.delete('/:idProyecto',function(req,res){
//     const {idProyecto}=req.params;
//     controller.deleteProyecto(idProyecto).then(result=>
//         response.success(res,result,200)).catch(error=>{
//         response.error(res,error,400,'unexpected error');    
//     });
// });
// routerProyecto.patch('/:idProyecto',function(req,res){
//     const {idProyecto}=req.params;
//     const data=req.body;
//     controller.patchProyecto(idProyecto,data).then(result=>
//         response.success(res,result,200)).catch(error=>{
//         response.error(res,error,400,'unexpected error');    
//     });
// })


//EXPORTADOS
module.exports=routerServicePlan;