//MODULOS
const { populate } = require('./model');
const modeloServicePlan=require('./model');

async function getServicePlanFromBd(){
    return new Promise((resolve,reject)=>{
        resolve(modeloServicePlan.find());
    });
};
async function postServicePlanToBd(servicePlanData){
        const postServicePlan=new modeloServicePlan(servicePlanData);
        return postServicePlan.save();
};
// async function deleteProyectoFromBd(idProyecto){
//     const deleteProyectoById=await modeloProyecto.findByIdAndDelete({_id:idProyecto});
//     return deleteProyectoById;
// };

// async function patchProyectoFromBd(idProyecto,data){
//     const updateParams={
//         "idProyecto":data.idProyecto,
//         "nombreProyecto":data.nombreProyecto,
//         "mascaraSubred":data.mascaraSubred,
//         "trafficSVN":data.trafficSVN
//     };
//     const updateProyecto=await modeloProyecto.findByIdAndUpdate({_id:idProyecto,},updateParams,{new:true});
//     return updateProyecto;
// };

module.exports={
    get:getServicePlanFromBd,
    post:postServicePlanToBd,
    // delete:,
    // patch:
};