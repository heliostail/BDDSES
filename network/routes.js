//MODULOS
const express=require('express');
//ROUTERS SECUNDARIOS /terminales /proyectos
const routerTerminales=require('../components/terminales/network');
const routerProyecto=require('../components/proyecto/network');
const routerServicePlan=require('../components/servicePlan/network');
const routerInfo=require('../components/info/network');
//ROUTER PRINCIPAL
const routerIndex=express.Router();
//END POINTS
const routes=function(app){
  app.use('/api/v1',routerIndex);
  routerIndex.use('/terminales', routerTerminales);
  routerIndex.use('/proyectos', routerProyecto);
  routerIndex.use('/serviceplan', routerServicePlan);
  routerIndex.use('/info',routerInfo);
};
//EXPORTADOS
module.exports= routes;