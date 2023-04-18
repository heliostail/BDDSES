//MODULOS
const store=require('./store');

function getProyecto(){
    return new Promise(async (resolve,reject)=>{
        const sitesList=await store.get();
        resolve(sitesList);
    });
};
async function postProyecto(data){
     return new Promise((resolve,reject)=>{
        if(!data.idProyecto||!data.nombreProyecto||!data.mascaraSubred||!data.trafficSVN){
            return reject('completar la información'); 
        };
        const proyectoData={
            idProyecto:data.idProyecto,
            nombreProyecto:data.nombreProyecto,
            mascaraSubred:data.mascaraSubred,
            trafficSVN:data.trafficSVN
        };
        console.log(proyectoData);
        resolve(store.post(proyectoData));
    })
};
async function deleteProyecto(idProyecto){
    return new Promise(async (resolve, reject)=>{
        if(!idProyecto){
            return reject('id invalido o no se especificó id');
        };
        const result=await store.delete(idProyecto);
        resolve(result);
    });
};
function patchProyecto(idProyecto,data){
    return new Promise(async (resolve,reject)=>{
        if(!idProyecto){
            return reject('id invalido o no se especificó id');
        }
        if(!data.idProyecto||!data.nombreProyecto||!data.mascaraSubred||!data.trafficSVN){
            return reject('completar la información');
        }
        const result=await store.patch(idProyecto,data);
        resolve(result);
    })
};

module.exports={getProyecto,postProyecto,deleteProyecto,patchProyecto}