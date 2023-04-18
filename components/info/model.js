//MODULOS
const mongoose=require('mongoose');
//ESQUEMA MONGOOSE PARA MONGODB
const Schema=mongoose.Schema;
    //IPS DEL POOL TRAFIC ETH0
const iPsSchema= new Schema({
    ip:{type:String,required: true},
    proyectoAssing:{type: Schema.ObjectId,ref: "proyectos"},
    siteAssing:{type: Schema.ObjectId,ref: "sitios"},    
});
    //IPS DEL POOL ADMIN SAT0
const iPsAdminSat0Schema= new Schema({
    ip:{type:String,required: true},
    siteAssing:{type: Schema.ObjectId,ref: "sitios"},    
});    
    //IPS DEL POOL TRAFFIC SAT0
const iPsTrafficEth0Schema= new Schema({
    ip:{type:String,required: true},
    proyectoAssing:{type: Schema.ObjectId,ref: "proyectos"},
    siteAssing:{type: Schema.ObjectId,ref: "sitios"},    
});    
const infoBeamPMOCSchema=new Schema({
    beam:{type:String,required: true},
    satelliteLocation:{type:String,required: true},
    downlink:{type:String,required: true},
    srKsym:{type:String,required: true},
    downlinkFreq:{type:String,required: true},
    ibXprd:{type:String,required: true},
});
const modeloiPs=mongoose.model('pool',iPsSchema);
const modeloiPsAdminSat0=mongoose.model('adminSat0',iPsAdminSat0Schema);
const modeloTrafficEth0=mongoose.model('trafficSat0',iPsTrafficEth0Schema);
const modeloInfoBeam=mongoose.model('infoBeam',infoBeamPMOCSchema);

module.exports={
    modeloiPs,
    modeloiPsAdminSat0,
    modeloTrafficEth0,
    modeloInfoBeam
};