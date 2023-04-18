//MODULOS
const { populate } = require('./model');
const modeloProyecto=require('./model');

async function getProyectoFromBd(){
    return new Promise((resolve,reject)=>{
        resolve(modeloProyecto.find());
    });
};
async function postProyectoToBd(proyectoData){
        const postProyecto=new modeloProyecto(proyectoData);
        return postProyecto.save();
};
async function deleteProyectoFromBd(idProyecto){
    const deleteProyectoById=await modeloProyecto.findByIdAndDelete({_id:idProyecto});
    return deleteProyectoById;
};

async function patchProyectoFromBd(idProyecto,data){
    const updateParams={
        "idProyecto":data.idProyecto,
        "nombreProyecto":data.nombreProyecto,
        "mascaraSubred":data.mascaraSubred,
        "trafficSVN":data.trafficSVN,
        "prefi":data.prefi
    };
    const updateProyecto=await modeloProyecto.findByIdAndUpdate({_id:idProyecto,},updateParams,{new:true});
    return updateProyecto;
};

module.exports={get:getProyectoFromBd,post:postProyectoToBd,delete:deleteProyectoFromBd,patch:patchProyectoFromBd};