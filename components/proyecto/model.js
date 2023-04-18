//MODULOS
const mongoose=require('mongoose');
//ESQUEMA MONGOOSE PARA MONGODB
const Schema=mongoose.Schema;

const proyectoSchema= new Schema({
    idProyecto:{type:String,required: true},
    nombreProyecto:{type:String,required: true},
    mascaraSubred:{type:String,required: true},
    trafficSVN:{type:String,required: true},//VNO
    prefi:{type:String,required: true},
});

const modeloProyecto=mongoose.model('proyectos',proyectoSchema);
module.exports=modeloProyecto;