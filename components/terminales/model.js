const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const sitesSchema= new Schema({
    //DATOS DE LA TERMINAL
    //CONTRATO
    contrato:{type:String,required: true},
    //FECHAS
    fechaCreacion:{type:String,required: true}, // Date,
    fechaActivacion:{type:String,required: true},//
    //CREADOR Y ESTATUS
    operador:{type:String,required: true},//
    estatus:{type:String,required: true},
    //NOMBRE TERMINAL
    nombreRemota:{type:String,required: true},
    idCliente:{type:String,required: true},
    //PROYECTO
    idproyecto:{type: Schema.ObjectId,ref: "proyectos"},
    // idProyecto:{type:String,required: true},
    // nombreProyecto:{type:String,required: true},
    // mascaraSubred:{type:String,required: true},
    // trafficSVN:{type:String,required: true},//VNO
    //PLAN DE SERVICIO
    idservice:{type: Schema.ObjectId,ref: "servicePlan"},
        // idservice:{type:String,required: true},
        // nombreServicePlan:{type:String,required: true},
        // mirOut:{type:String,required: true},
        // cirOut:{type:String,required: true},
        // mirIn:{type:String,required: true},
        // cirIn:{type:String,required: true},
    //SERIE DE MÓDEM
    serieModem:{type:String,required: true},
    modeloModem:{type:String,required: true},
    //BEAM Y COORDENADAS
    beam:{type:String,required: true},
    longitud:{type:String,required: true},
    latitud:{type:String,required: true},
    //IPS
        //IPS ADMIN
    adminSat0:{type:String,required: true},
    trafficSat0:{type:String,required: true},
        //IPS MODEM
    trafficSubnet:{type:String,required: true},
    trafficEth0:{type:String,required: true},
    trafficDHCP:{type:String,required: true},
    trafficBroadcast:{type:String,required: true},
    //ANNTENA CODE Y PRUEBAS PMOC
    siteID:{type:String,required: true},
    confirmationCode:{type:String,required: true},
    maxPowerdBm:{type:String,required: true},
    p1dBdBm:{type:String,required: true},
    xPol:{type:String,required: true},
    powerFootroom:{type:String,required: true},
    powerHeadroom:{type:String,required: true},
});

const model=mongoose.model('sitios',sitesSchema);
module.exports=model;