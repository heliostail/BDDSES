var XLSX=require("xlsx");
let dataExcel;
let packetJson=[];
urlExcel="/mnt/c/Users/Noc Usuario/Desktop/BDSES/components/terminales/dataFromExcel/src/datosTerminales.xlsx";   
//urlExcel cambia cuando se ejecuta en otro equipo,copear la de la terminal y al final agregar nombre del excel

function excelajson(ruta){
    const excel=XLSX.readFile(ruta);
    var nombreHoja=excel.SheetNames;
    // let datos=XLSX.utils.sheet_to_json(excel.Sheets[nombreHoja[0]]);
    const sheet=nombreHoja[0];
    dataExcel=XLSX.utils.sheet_to_json(excel.Sheets[sheet]);
    // console.log(dataExcel);
    let dataObject; 
    dataExcel.map(a=>{
        if(a.contrato){
            dataObject={
                contrato:a.contrato||'NONE',
                fechaCreacion:a.fechaCreacion||'NONE',
                fechaActivacion:a.fechaActivacion||'NONE',
                operador:a.operador||'NONE',
                estatus:a.estatus||'NONE',
                nombreRemota:a.nombreRemota||'NONE',
                idCliente:a.idCliente||'NONE',
                idproyecto:a.idproyecto||'NONE',
                idservice:a.idservice||'NONE',
                serieModem:a.serieModem||'NONE',
                modeloModem:a.modeloModem||'NONE',
                beam:a.beam||'NONE',
                longitud:a.longitud||'NONE',
                latitud:a.latitud||'NONE',
                adminSat0:a.adminSat0||'NONE',
                trafficSat0:a.trafficSat0||'NONE',
                trafficSubnet:a.trafficSubnet||'NONE',
                trafficEth0:a.trafficEth0||'NONE',
                trafficDHCP:a.trafficDHCP||'NONE',
                trafficBroadcast:a.trafficBroadcast||'NONE',
                siteID:a.siteID||'NONE',
                confirmationCode:a.confirmationCode||'NONE',
                maxPowerdBm:a.maxPowerdBm||'NONE',
                p1dBdBm:a.p1dBdBm||'NONE',
                xPol:a.xPol||'NONE',
                powerFootroom:a.powerFootroom||'NONE',
                powerHeadroom:a.powerHeadroom||'NONE'
            };
        }else if(a.ip){
            dataObject={
                ip:a.ip||'000000000000000000000000',
                proyectoAssing:a.proyectoAssing||'000000000000000000000000',
                siteAssing:a.siteAssing||'000000000000000000000000'
            };
        }else{
            dataObject={};
        };                
        packetJson.push(dataObject);
    })
    console.log(packetJson);
    return packetJson;
};
module.exports=excelajson;