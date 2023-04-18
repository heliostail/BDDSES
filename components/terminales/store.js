//MODULOS
const modeloTerminal=require('./model');
const { populate } = require('./model');

async function getTerminalFromBd(filter){
    const propiedad=Object.keys(filter);
    const valor=Object.values(filter); 
    // const searchFilter={};    
    // searchFilter[`${propiedad}`]=`${valor}`;
    // console.log(searchFilter);

    return new Promise((resolve,reject)=>{
       const lista=modeloTerminal.find(filter).populate('idproyecto').populate('idservice');
       resolve(lista);   
    });
};
function postTerminalToBd(siteData){    
    const newSiteData=new modeloTerminal(siteData);
    return newSiteData.save();
};
async function patchTerminalfromBd(idTerminal,contrato,
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
    const updateParams={
        //CONTRATO
        "contrato":contrato,
        //FECHAS
        "fechaCreacion":fechaCreacion,
        "fechaActivacion":fechaActivacion,
        //CREADOR Y ESTATUS
        "operador":operador,
        "estatus":estatus,
        //NOMBRE TERMINAL
        "nombreRemota":nombreRemota,
        "idCliente":idCliente,
        //PROYECTO
        "idproyecto":idproyecto,
        //PLAN DE SERVICIO
        "idservice":idservice,
        //SERIE DE MÓDEM
        "serieModem":serieModem,
        "modeloModem":modeloModem,
        //BEAM Y COORDENADAS
        "beam":beam,
        "longitud":longitud,
        "latitud":latitud,
        //IPS
            //IPS ADMIN
        "adminSat0":adminSat0,
        "trafficSat0":trafficSat0,
            //IPS MODEM
        "trafficSubnet":trafficSubnet,  
        "trafficEth0":trafficEth0,
        "trafficDHCP":trafficDHCP,
        "trafficBroadcast":trafficBroadcast,  
        //ANNTENA CODE Y PRUEBAS PMOC
        "siteID":siteID,
        "confirmationCode":confirmationCode,
        "maxPowerdBm":maxPowerdBm,
        "p1dBdBm":p1dBdBm,
        "xPol":xPol,
        "powerFootroom":powerFootroom,
        "powerHeadroom":powerHeadroom
    };
    // {"contrato":contrato},
    // {"fechacreacion":fechacreacion},
    // {"nombreremoto":nombreremoto},
    // {"seriemodem":seriemodem},
    // {"idcliente":idcliente},
    // {"longitud":longitud},
    // {"latitud":latitud},
    // {"estatus":estatus},
    // {"modelomodem":modelomodem},
    // {"idproyecto":idproyecto},
    // {"idservice":idservice},
    const updateTerminal=await modeloTerminal.findByIdAndUpdate({_id:idTerminal,},updateParams,{new:true}).populate('idservice').populate('idproyecto');
    return updateTerminal;
};
async function deleteTerminalFromBd(idTerminal){
    const deleteTerminalById=await modeloTerminal.findByIdAndDelete({_id:idTerminal});
    return deleteTerminalById;
};
    //store.postExcel para acargar datos a la BD del excel
    function postDataFromExcelTerminalToBd(dataFromExcel){    
        return modeloTerminal.insertMany(dataFromExcel);
    };

//EXPORTADOS
module.exports={get:getTerminalFromBd,post:postTerminalToBd,patch:patchTerminalfromBd,delete:deleteTerminalFromBd,postExcel:postDataFromExcelTerminalToBd};