//MODULOS
const store=require('./store');

function getServicePlan(){
    return new Promise(async (resolve,reject)=>{
        const servicePlanList=await store.get();
        resolve(servicePlanList);
    });
};
async function postProyecto(data){
     return new Promise((resolve,reject)=>{
        if(!data.idservice||!data.nombreServicePlan||!data.mirOut||!data.mirIn){
            return reject('completar la información'); 
        };
        const cirOutFromMirOut=data.mirOut/25;
        const cirInFromMirIn=data.mirIn/25;

        const serviciePlanData={
            idservice:data.idservice,
            nombreServicePlan:data.nombreServicePlan,
            mirOut:data.mirOut,
            cirOut:`${cirOutFromMirOut}`,
            mirIn:data.mirIn,
            cirIn:`${cirInFromMirIn}`
        };
        console.log(serviciePlanData);
        resolve(store.post(serviciePlanData));
    })
};
// async function deleteProyecto(idProyecto){
//     return new Promise(async (resolve, reject)=>{
//         if(!idProyecto){
//             return reject('id invalido o no se especificó id');
//         };
//         const result=await store.delete(idProyecto);
//         resolve(result);
//     });
// };
// function patchProyecto(idProyecto,data){
//     return new Promise(async (resolve,reject)=>{
//         if(!idProyecto){
//             return reject('id invalido o no se especificó id');
//         }
//         if(!data.idProyecto||!data.nombreProyecto||!data.mascaraSubred||!data.trafficSVN){
//             return reject('completar la información');
//         }
//         const result=await store.patch(idProyecto,data);
//         resolve(result);
//     })
// };

module.exports={
    getServicePlan,
    postProyecto,
    // deleteProyecto,
    // patchProyecto
}