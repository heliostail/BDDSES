const store=require('./store');
//ROUTER METODOS A IPS
async function getiPs(){
    return new Promise((resolve,reject)=>{
        resolve(store.getId());
    });
};
async function postiPs(dataFromExcel){
    return new Promise((resolve,reject)=>{  
        console.log(dataFromExcel,'postIpsExcel');
        if(!dataFromExcel){
            return reject('información erronea');
        }
        resolve(store.postId(dataFromExcel));
    });
};
async function patchiPs(idIp,ip,proyectoAssing,siteAssing){
    return new Promise(async(resolve,reject)=>{
        if(!idIp){
            return reject('no se especificó un id');
        };
        if(!ip||!proyectoAssing||!siteAssing){
            return reject('completar información');
        };
        const result=await store.patchId(idIp,ip,proyectoAssing,siteAssing);
        resolve(result);
    });
};
//ROUTER METODOS IPS ADMIN SAT0
async function getiPsadminSat0(){
    return new Promise((resolve,reject)=>{
        resolve(store.getIdAdmin());
    });
};
async function postiPsadminSat0(dataFromExcel){
    return new Promise((resolve,reject)=>{  
        console.log(dataFromExcel,'postadminSat0Excel');
        if(!dataFromExcel){
            return reject('información erronea');
        }
        resolve(store.postIdAdmin(dataFromExcel));
    });
};
async function patchiPsadminSat0(idIp,ip,siteAssing){
    return new Promise(async(resolve,reject)=>{
        if(!idIp){
            return reject('no se especificó un id');
        };
        if(!ip||!siteAssing){
            return reject('completar información');
        };
        const result=await store.patchIdAdminSat0(idIp,ip,siteAssing);
        resolve(result);
    });
};
//ROUTER METODOS IPS TRAFFIC SAT0
async function getiPstrafficSat0(){
    return new Promise((resolve,reject)=>{
        resolve(store.getIdTraffic());
    });
};
async function postiPstrafficSat0(dataFromExcel){
    return new Promise((resolve,reject)=>{  
        console.log(dataFromExcel,'postTrafficSat0Excel');
        if(!dataFromExcel){
            return reject('información erronea');
        }
        resolve(store.postIdTraffic(dataFromExcel));
    });
};
async function patchiPstrafficSat0(idIp,ip,proyectoAssing,siteAssing){
    return new Promise(async(resolve,reject)=>{
        if(!idIp){
            return reject('no se especificó un id');
        };
        if(!ip||!proyectoAssing||!siteAssing){
            return reject('completar información');
        };
        const result=await store.patchIdTrafficSat0(idIp,ip,proyectoAssing,siteAssing);
        resolve(result);
    });
};
//BEAM INFO
async function getInfo(){
    return new Promise((resolve,reject)=>{
        resolve(store.getInfoBeam());
    });
};
module.exports={
    getiPs,
    postiPs,
    getiPsadminSat0,
    postiPsadminSat0,
    getiPstrafficSat0,
    postiPstrafficSat0,
    getInfo,
    patchiPs,
    patchiPsadminSat0,
    patchiPstrafficSat0
};