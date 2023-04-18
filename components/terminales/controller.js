//MODULOS
const store=require('./store');

function getTerminal(filter){
    return new Promise(async (resolve,reject)=>{
        const sitesList=await store.get(filter);
        resolve(sitesList);
    });
};
async function postTerminal(data){
    return new Promise((resolve,reject)=>{
        if(!data.contrato
            ||!data.operador
            ||!data.idproyecto
            ||!data.idservice
            ||!data.serieModem
            ||!data.beam||!data.longitud||!data.latitud
            ||!data.adminSat0||!data.trafficSat0
            ||!data.trafficSubnet||!data.trafficEth0||!data.trafficDHCP||!data.trafficBroadcast
            ){
            return reject('completar la información');
        };
        const siteData={
            //Contrato
            contrato:data.contrato,
            //fechas
            fechaCreacion:data.fechaCreacion,
            fechaActivacion:'PENDIENTE',
            //creador y estatus
            operador:data.operador,
            estatus:'PENDIENTE',
            //nombre terminal
            nombreRemota:`Televera, S1092212-${data.num}, SN ${data.serieModem}, ${data.prefi??'NON'} ${data.contrato}`,
            idCliente:`${data.prefi??'NON'} ${data.contrato}`,
            //proyecto
            idproyecto:data.idproyecto,
            //plan de servicio
            idservice:data.idservice,
            //serie de módem
            serieModem:data.serieModem,
            modeloModem:'IQ-Desktop',
            //beam y coordenadas
            beam:data.beam,
            longitud:data.longitud,
            latitud:data.latitud,
            //ips
            adminSat0:data.adminSat0,
            trafficSat0:data.trafficSat0,
            trafficSubnet:data.trafficSubnet,
            trafficEth0:data.trafficEth0,
            trafficDHCP:data.trafficDHCP,
            trafficBroadcast:data.trafficBroadcast,
            //anntena code y pruebas pmoc
            siteID:'NONE',
            confirmationCode:'NONE',
            maxPowerdBm:'NONE',
            p1dBdBm:'NONE',
            xPol:'NONE',
            powerFootroom:'NONE',
            powerHeadroom:'NONE'        

        };
        console.log(siteData);
        resolve(store.post(siteData));
    });
};
function patchtTerminal(idTerminal,contrato,
    fechaCreacion,fechaActivacion,
    operador,estatus,
    nombreRemota,idCliente,
    idproyecto,
    idservice,
    serieModem,modeloModem,
    beam,longitud,latitud,
    adminSat0,trafficSat0,
    trafficSubnet,trafficEth0,trafficDHCP,trafficBroadcast,
    siteID,confirmationCode,maxPowerdBm,p1dBdBm,xPol,powerFootroom,powerHeadroom){
    return new Promise(async (resolve,reject)=>{
        if(!idTerminal){
            return reject('id invalido o no se especificó id');
        };
        if(!contrato
        ||!fechaCreacion||!fechaActivacion
        ||!operador||!estatus
        ||!nombreRemota||!idCliente
        ||!idproyecto
        ||!idservice
        ||!serieModem||!modeloModem
        ||!beam||!longitud||!latitud
        ||!adminSat0||!trafficSat0
        ||!trafficSubnet||!trafficEth0||!trafficDHCP||!trafficBroadcast
        ||!siteID||!confirmationCode||!maxPowerdBm||!p1dBdBm||!xPol||!powerFootroom||!powerHeadroom){
            return reject('completar la información');
        };
        const result=await store.patch(idTerminal,contrato,
            fechaCreacion,fechaActivacion,
            operador,estatus,
            nombreRemota,idCliente,
            idproyecto,
            idservice,
            serieModem,modeloModem,
            beam,longitud,latitud,
            adminSat0,trafficSat0,
            trafficSubnet,trafficEth0,trafficDHCP,trafficBroadcast,
            siteID,confirmationCode,maxPowerdBm,p1dBdBm,xPol,powerFootroom,powerHeadroom);
        resolve(result);
    });
};
function deleteTerminal(idTerminal){
    return new Promise(async (resolve, reject)=>{
        if(!idTerminal){
            return reject('id invalido o no se especificó id');
        };
        const result=await store.delete(idTerminal);
        resolve(result);
    });
};

        //POST para agregar data del excel de terminales
        async function postTerminalExcel(dataFromExcel){
            return new Promise((resolve,reject)=>{  
                console.log(dataFromExcel,'postTerminalExcel');
                resolve(store.postExcel(dataFromExcel));
            });
        };

//EXPORTADOS
module.exports={deleteTerminal,getTerminal,postTerminal,patchtTerminal,postTerminalExcel};