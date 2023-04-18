//MODULOS
const mongoose=require('mongoose');
//ESQUEMA MONGOOSE PARA MONGODB
const Schema=mongoose.Schema;

const servicePlanSchema= new Schema({
    idservice:{type:String,required: true},
    nombreServicePlan:{type:String,required: true},
    mirOut:{type:String,required: true},
    cirOut:{type:String,required: true},//Automatico
    mirIn:{type:String,required: true},
    cirIn:{type:String,required: true},//Automatico
});

const modeloServicePlan=mongoose.model('servicePlan',servicePlanSchema);
module.exports=modeloServicePlan;