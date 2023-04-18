const express=require('express');
const { required } = require('nodemon/lib/config');
const response=require('../../network/response');
const controller=require('./controller');
const excelajson=require('./../terminales/dataFromExcel/src/mainExcelToJson');
const routerInfo=express.Router();
const urlExcel='/mnt/c/Users/Noc Usuario/Desktop/BDSES/components/terminales/dataFromExcel/src/pools.xlsx'
//ROUTER METODOS A IPS
routerInfo.get('/ips/eth',function(req,res){
    controller.getiPs().then(iPsList=>
        response.success(res,iPsList,200)).catch(error=>{
        response.error(res,error,400,'unexpected error');
    });    
});
routerInfo.post('/ips/eth/excel',function(req,res){
    const dataFromExcel=excelajson(urlExcel);
    console.log(dataFromExcel,'routerIps.post EXCEL')
    controller.postiPs(dataFromExcel).then(returned=>
        response.success(res,returned,200)).catch(error=>{
        response.error(res,error,400,'unexpected error');
    });
});
routerInfo.post('/ips/eth',function(req,res){
    const data=req.body;
    controller.postiPs(data).then(returned=>
        response.success(res,returned,200)).catch(error=>{
        response.error(res,error,400,'unexpected error');
    });
});
routerInfo.patch('/ips/eth',function(req,res){
    const data=req.body;
    const idIp=data._id;
    console.log(idIp,data,'a modificar');
    controller.patchiPs(idIp,data.ip,data.proyectoAssing,data.siteAssing).then(returned=>response.success(res,returned,200)).catch(error=>{response.error(res,error,400,'unexpected error');});    
});
//ROUTER GET METODOS PARA ADMIN SAT0
routerInfo.get('/ips/admin',function(req,res){
    controller.getiPsadminSat0().then(iPsList=>
        response.success(res,iPsList,200)).catch(error=>{
        response.error(res,error,400,'unexpected error');
    });    
});
routerInfo.post('/ips/admin/excel',function(req,res){
    const dataFromExcel=excelajson(urlExcel);
    console.log(dataFromExcel,'routerIpssadmin.post EXCEL')
    controller.postiPsadminSat0(dataFromExcel).then(returned=>
        response.success(res,returned,200)).catch(error=>{
        response.error(res,error,400,'unexpected error');
    });
});
routerInfo.post('/ips/admin',function(req,res){
    const data=req.body;
    controller.postiPsadminSat0(data).then(returned=>
        response.success(res,returned,200)).catch(error=>{
        response.error(res,error,400,'unexpected error');
    });
});
routerInfo.patch('/ips/admin',function(req,res){
    const data=req.body;
    const idIp=data._id;
    console.log(idIp,data,'a modificar');
    controller.patchiPsadminSat0(idIp,data.ip,data.siteAssing).then(returned=>response.success(res,returned,200)).catch(error=>{response.error(res,error,400,'unexpected error');});    
});
//ROUTER GET METODOS PARA TRAFFIC SAT0
routerInfo.get('/ips/traffic',function(req,res){
    controller.getiPstrafficSat0().then(iPsList=>
        response.success(res,iPsList,200)).catch(error=>{
        response.error(res,error,400,'unexpected error');
    });    
});
routerInfo.post('/ips/traffic/excel',function(req,res){
    const dataFromExcel=excelajson(urlExcel);
    console.log(dataFromExcel,'routerIpsTraffic.post EXCEL')
    controller.postiPstrafficSat0(dataFromExcel).then(returned=>
        response.success(res,returned,200)).catch(error=>{
        response.error(res,error,400,'unexpected error');
    });
});
routerInfo.post('/ips/traffic',function(req,res){
    const data=req.body;
    controller.postiPstrafficSat0(data).then(returned=>
        response.success(res,returned,200)).catch(error=>{
        response.error(res,error,400,'unexpected error');
    });
});
routerInfo.patch('/ips/traffic',function(req,res){
    const data=req.body;
    const idIp=data._id;
    console.log(idIp,data,'a modificar');
    controller.patchiPstrafficSat0(idIp,data.ip,data.proyectoAssing,data.siteAssing).then(returned=>response.success(res,returned,200)).catch(error=>{response.error(res,error,400,'unexpected error');});    
});
//ROUTER METOSDOS PARA TABLA INFORM PMOC
routerInfo.get('/beam',function(req,res){
    controller.getInfo().then(iPsList=>
        response.success(res,iPsList,200)).catch(error=>{
        response.error(res,error,400,'unexpected error');
    });    
});
module.exports=routerInfo;