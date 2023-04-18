//MODULOS
const { populate } = require('./model');
const modeloiPs=require('./model').modeloiPs;
const modeloInfoBeam=require('./model').modeloInfoBeam;
const modeloiPsAdminSat0=require('./model').modeloiPsAdminSat0;
const modeloTrafficEth0=require('./model').modeloTrafficEth0;

async function getiDsFromBd(){
    return new Promise((resolve,reject)=>{
        resolve(modeloiPs.find());
        // .populate('proyectoAssing').populate('siteAssing')
    });
};
async function postiPsToBd(dataFromExcel){
    return modeloiPs.insertMany(dataFromExcel);
};
async function patchIdById(idIp,ip,proyectoAssing,siteAssing){
    const toUpdate={
        'ip':ip,
        'proyectoAssing':proyectoAssing,
        'siteAssing':siteAssing
    };
    const updateTerminal=await modeloiPs.findByIdAndUpdate({_id:idIp,},toUpdate,{new:true});
    return updateTerminal;
};
//METODOS IPS ADMIN SAT 0
async function getiDsAdminSat0FromBd(){
    return new Promise((resolve,reject)=>{
        resolve(modeloiPsAdminSat0.find());
        // .populate('proyectoAssing').populate('siteAssing')
    });
};
async function postiPsAdminSat0ToBd(dataFromExcel){
    return modeloiPsAdminSat0.insertMany(dataFromExcel);
};
async function patchIdAdminSat0ById(idIp,ip,siteAssing){
    const toUpdate={
        'ip':ip,
        'siteAssing':siteAssing
    };
    const updateTerminal=await modeloiPsAdminSat0.findByIdAndUpdate({_id:idIp,},toUpdate,{new:true});
    return updateTerminal;
};
//METODOS IPS TRAFFIC SAT0
async function getiDsTrafficSat0FromBd(){
    return new Promise((resolve,reject)=>{
        resolve(modeloTrafficEth0.find());
    });
};
async function postiPsTrafficSat0ToBd(dataFromExcel){
    return modeloTrafficEth0.insertMany(dataFromExcel);
};
async function patchIdTrafficSat0ById(idIp,ip,proyectoAssing,siteAssing){
    const toUpdate={
        'ip':ip,
        'proyectoAssing':proyectoAssing,
        'siteAssing':siteAssing
    };
    const updateTerminal=await modeloTrafficEth0.findByIdAndUpdate({_id:idIp,},toUpdate,{new:true});
    return updateTerminal;
};
//METODOS INFOR BEAM
async function getInfoBeamFromBd(){
    return new Promise((resolve,reject)=>{
        resolve(modeloInfoBeam.find());
    });
};
module.exports={
    getId:getiDsFromBd,
    postId:postiPsToBd,
    getInfoBeam:getInfoBeamFromBd,
    getIdAdmin:getiDsAdminSat0FromBd,
    postIdAdmin:postiPsAdminSat0ToBd,
    getIdTraffic:getiDsTrafficSat0FromBd,
    postIdTraffic:postiPsTrafficSat0ToBd,
    patchId:patchIdById,
    patchIdAdminSat0:patchIdAdminSat0ById,
    patchIdTrafficSat0:patchIdTrafficSat0ById,

    // delete:deleteProyectoFromBd,
    // patch:patchProyectoFromBd
};