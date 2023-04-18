//MODULOS
const express=require('express');
const response=require('../../network/response');
const controller=require('./controller');
    //DATAFROMEXCEL
    const excelajson=require('./dataFromExcel/src/mainExcelToJson')
    urlExcel="/mnt/c/Users/Noc Usuario/Desktop/BDSES/components/terminales/dataFromExcel/src/datosTerminales.xlsx";  

//ROUTER
const routerTerminales=express.Router();
//METODOS
    //GET
routerTerminales.get('/',function(req,res){

    let filter={};
    if(req.query.filter){
        let variable=Object.keys(req.query.filter);

        switch (variable[0]){
            case 'contrato':
                const {contrato}=req.query.filter;                 
                    if(contrato){
                        console.log('solicitud',variable,contrato);
                        filter={ contrato:contrato };
                    };
                break;
            case 'serieModem':
                const {serieModem}=req.query.filter;                 
                if(serieModem){
                    console.log('solicitud',variable,serieModem);
                    filter={ serieModem:serieModem };
                };
                break;
            case 'trafficEth0':
                const {trafficEth0}=req.query.filter;                 
                if(trafficEth0){
                    console.log('solicitud',variable,trafficEth0);
                    filter={ trafficEth0:trafficEth0 };
                };
                break;
            case 'idproyecto':
                const {idproyecto}=req.query.filter;                 
                if(idproyecto){
                    filter={ idproyecto:idproyecto };
                    console.log('solicitud',variable,filter);
                };
                break;
            case 'beam':
                const {beam}=req.query.filter;                 
                if(beam){
                    console.log('solicitud',variable,beam);
                    filter={ beam:beam };
                };
                break;
            case 'siteID':
                const {siteID}=req.query.filter;                 
                if(siteID){
                    console.log('solicitud',variable,siteID);
                    filter={ siteID:siteID };
                };
                break;
        }
    };
    controller.getTerminal(filter).then(terminalList=>
        response.success(res,terminalList,200)).catch(error=>{
        response.error(res,error,400,'unexpected error');
    });
});
    //POST
routerTerminales.post('/',function(req,res){
    const data=req.body;
    controller.postTerminal(data).then(returned=>
        response.success(res,returned,200)).catch(error=>{
        response.error(res,error,400,'unexpected error');
    });
});
        //POST DATA FROM EXCEL
        routerTerminales.post('/excel',function(req,res){
            const dataFromExcel=excelajson(urlExcel);
            console.log(dataFromExcel,'routerTerminales.post EXCEL')
            controller.postTerminalExcel(dataFromExcel).then(returned=>
                response.success(res,returned,200)).catch(error=>{
                response.error(res,error,400,'unexpected error');
            });
        });
    //PATCH    
routerTerminales.patch('/patch/',function(req,res){
    // const {idTerminal}=req.params;
    const data=req.body;
    const idTerminal=data._id;
    console.log(req,'lo que recibe');
    console.log(data);
    controller.patchtTerminal(idTerminal,
        data.contrato,
        data.fechaCreacion,data.fechaActivacion,
        data.operador,data.estatus,
        data.nombreRemota,data.idCliente,
        data.idproyecto,
        data.idservice,
        data.serieModem,data.modeloModem,
        data.beam,data.longitud,data.latitud,
        data.adminSat0,data.trafficSat0,
        data.trafficSubnet,data.trafficEth0,data.trafficDHCP,data.trafficBroadcast,
        data.siteID,data.confirmationCode,data.maxPowerdBm,data.p1dBdBm,data.xPol,data.powerFootroom,data.powerHeadroom).then(returned=>
        response.success(res,returned,200)).catch(error=>{
        response.error(res,error,400,'unexpected error');});
});
    //DELETE
routerTerminales.delete('/:idTerminal',function(req,res){
    const {idTerminal}=req.params;
    console.log(idTerminal);
    controller.deleteTerminal(idTerminal).then(returned=>
        response.success(res,returned,200)).catch(error=>{
        response.error(res,error,400,'unexpected error');
    });
});
//EXPORTADOS
module.exports=routerTerminales;