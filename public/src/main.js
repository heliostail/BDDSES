window.addEventListener('DOMContentLoaded',getInfoFromMongoDb,false);
const APIurl='http://172.16.120.254:3000/api/v1/';//MODIFICAR IP DE HOST CUANDO CAMBIE LA RED ETHERNET DEL SERVIDOR/COMPUTADORA
const APIurlTerminales='/terminales/';
const APIurlProyecto='/proyectos/';
const APIurlServicePlan='/serviceplan/';
const APIurlTerminalesPatch='/terminales/patch/';
const APIurlInfoBeam='/info/beam/';
const APIurlIpsPool='/info/ips/eth/';
const APIurlIpsAdminSat0='/info/ips/admin/';
const APIurlIpsTrafficSat0='/info/ips/traffic/';
const defaultId='000000000000000000000000';
var ListaCompletaTerminales;
var ListaCompletaProyectos;
var ListaCompletaServicePlan;
var infoBeam;
var listaTerminalesBusqueda;
var listaIpsPool;
var listaIpsAdminSat0;
var listaIpsTrafficSat0;
const operadores=['AMANH','AORTIZ','BETSA','EDRIV','ELOPEZ','FREOR','GACRO','JAVA','JESDI','JLPAR','JOAL','JOREP','JPRRA','JUGAA','LAPI','LOJRO','MEGGO','MODC','PBG'];//--->LISTA DE OPERADORES
//comando powersell para NATEAR wsl2 CON WINDOWS AL LOCAL HOST 0.0.0.0
// netsh interface portproxy add v4tov4 listenport=3000 listenaddress=0.0.0.0 connectport=3000 connectaddress=172.22.133.175  <====Ultima IP tomarla del UBUNTU, comando ip addr eth0: inet 172.30.17.213
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //INSTANCIA DEL MODULO AXIOS
const api=axios.create({
    baseURL:APIurl,
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //METODOS AXIOS PARA COMUNICACION CON EL BACKEND
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //METODO GET PARA LISTA TERMINALES, LISTA PROYECTOS, LISTA SERVICE PLAN, INFO BEAM, ADMINSAT0, TRAFFICSAT0, TRAFFICETH0
async function getInfoFromBD(APIurlInfo){
    const {data}=await api(APIurlInfo);
    return data;
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //GET BUSCAR
async function getTerminalListbySearch(inputContrato,searchParameter){
    const filter={};
    filter[`${searchParameter}`]=inputContrato;
    const {data}=await api(APIurlTerminales,{
    params:{filter}
  });
  listaTerminalesBusqueda=data;
  console.log('Enter','getTerminalListbySearch');
  console.log(listaTerminalesBusqueda);
  tablaInformacionTerminales.innerHTML=domCreatorTablasListaTerminales(listaTerminalesBusqueda); 
  footerTableGeneralInfo.innerHTML=`Total de terminales :${listaTerminalesBusqueda.length}`;
};
  //PATCH TERMINAL POR ID
async function patchTerminalByID(terminalById){
  const {data}=await api.patch(APIurlTerminalesPatch,terminalById);
  return data;
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //PATCH IP POOL
async function patchIp(APIurlInfo,ipData){
  const {data}=await api.patch(APIurlInfo,ipData);
  return data;
};
  //POST NUEVA IP POOL
async function postIp(APIurlInfo,ipData){
  const {data}=await api.post(APIurlInfo,ipData);
  return data;
};
///////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
  //DELETE TERMINAL POR ID
async function deleteTerminalByID(terminalId){
  const {data}=await api.delete(`${APIurlTerminales}${terminalId}`);
  return data;
};
  //POST CREAR NUEVA TERMINAL
async function postNewTerminal(dataNewTerminal){
  const {data}=await api.post(APIurlTerminales,dataNewTerminal);
  return data;
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//EVENTOS LISTENERS
  //RECARGAR TODA LA INFORMACIÓN DANDO CLICK DESDE EL TITULO
recharge.onclick=()=>{getInfoFromMongoDb();};
  //INPUT BUSCAR CONTRATO
inputSearchContrato.addEventListener("keyup", function(event){
    if(event.key==="Enter"){
        const inputContrato=inputSearchContrato.value.split(' ').join('');
        const searchParameter=inputSearchContrato.getAttribute("placeholder"); 
        getTerminalListbySearch(inputContrato,searchParameter);
        inputSearchContrato.value='';
    };
});
  //INPUT BUSCAR SERIE DEL MÓDEM
inputSearchSerieModem.addEventListener("keyup", function(event){
    if(event.key==="Enter"){
        const inputModem=inputSearchSerieModem.value.split(' ').join('');
        const searchParameter=inputSearchSerieModem.getAttribute("placeholder"); 
        getTerminalListbySearch(inputModem,searchParameter);
        inputSearchSerieModem.value='';
    };
});
  //INPUT BUSCAR IP MÓDEM
inputSearchTrafficEth0.addEventListener("keyup", function(event){
    if(event.key==="Enter"){
        const inputTrafficEth0=inputSearchTrafficEth0.value.split(' ').join('');
        const searchParameter=inputSearchTrafficEth0.getAttribute("placeholder"); 
        getTerminalListbySearch(inputTrafficEth0,searchParameter);
        inputSearchTrafficEth0.value='';
    };
});
  //INPUT BUSCAR PROYECTO, SITE ID Y BEAM
inputSearchGeneric.addEventListener("keyup", function(event){
    if(event.key==="Enter"){
        let inputInputSearchGeneric=inputSearchGeneric.value.trim().toUpperCase();
        const searchParameter=optionSearch.value; 
            if(searchParameter=='idproyecto'){
                if(inputInputSearchGeneric){
                    const nameProyecto=inputInputSearchGeneric;
                    inputInputSearchGeneric=(ListaCompletaProyectos.find(a=>a.nombreProyecto==nameProyecto)??{})._id??{};
                };
            };
        getTerminalListbySearch(inputInputSearchGeneric,searchParameter);
        inputSearchGeneric.value='';
    };
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //ABRIR MODAL DE CREAR TERMINAL
crearTerminal.onclick=()=>{
  openModalCreacionTerminal();  
  limpiarInputsCrearTerminal();
  let idIP;
  idIP=findIp(createProyecto.value,getsDHCP);
  console.log(idIP);
  trafficEth0Create.value=idIP.trafficEth0;
  trafficDHCPCreate.value=idIP.trafficDHCP;
  trafficBroadcastCreate.value=idIP.trafficBroadcast;
    createProyecto.addEventListener('change',()=>{
    switch (createProyecto.value){
      case '635475eb01b1b9ce96d3a054': //OXXO
      case '6355f5a5559e006aa79def68':  //TELMEX
      case '6355f555559e006aa79def5c': //SADER
      case '6355f4d5559e006aa79def4a':  //DEMO
      case '6355f42d559e006aa79def38': //BANCO AZTECA
      case '6355f5e1559e006aa79def70':  //TOTAL PLAY
      case '6355f58d559e006aa79def64':  //STGT
        idIP=findIp(createProyecto.value,getsDHCP);
        console.log(idIP);
        trafficEth0Create.value=idIP.trafficEth0;
        trafficDHCPCreate.value=idIP.trafficDHCP;
        trafficBroadcastCreate.value=idIP.trafficBroadcast;
        console.log(idIP);
        break;      
      case '635465c9aa3435afb96b3b92': //ElEKTRA     
        adminSat0Create.value=listaIpsAdminSat0.find(a=>a.siteAssing==defaultId).ip;
        trafficSat0Create.value=listaIpsTrafficSat0.find(a=>a.proyectoAssing==createProyecto.value&&a.siteAssing==defaultId).ip;
        clearInputTraffic();
        break;
      case '635476c2d756eb78380ba5bb': //BANORTE
      case '6355f500559e006aa79def50': //HSBC
      case '6355f460559e006aa79def3e': //CEMEX
        adminSat0Create.value=listaIpsAdminSat0.find(a=>a.siteAssing==defaultId).ip;
        trafficSat0Create.value=listaIpsTrafficSat0.find(a=>a.proyectoAssing==defaultId&&a.siteAssing==defaultId).ip;
        clearInputTraffic();
        break;
      default:
        idIP=findIp(defaultId,getsDHCP);
        console.log(idIP);
        trafficEth0Create.value=idIP.trafficEth0;
        trafficDHCPCreate.value=idIP.trafficDHCP;
        trafficBroadcastCreate.value=idIP.trafficBroadcast;
        console.log(idIP);
    };
    validateFormulario();
  });
  window.addEventListener("keyup",validateFormulario);
  window.onclick=function(event) {
    // console.log(event.target);
    if (event.target==modalCreacionTerminal) {
        modalCreacionTerminal.style.display = "none"; 
        crearNuevaTerminal.disabled=false;
        crearNuevaTerminal.style.display='block'
        body.style.position = "inherit";
        body.style.height = "auto";
        body.style.overflow = "visible";
    };
  };
};
  //LIMPIAR INPUTS EN MODAL CREAR TERMINAL
function limpiarInputsCrearTerminal(){
  contratoCreate.value='';
  serieModemCreate.value='';
  longitudCreate.value='';
  latitudCreate.value='';
  adminSat0Create.value='';
  trafficSat0Create.value='';
  trafficSubnetCreate.value='';
  trafficEth0Create.value='';
  trafficDHCPCreate.value='';
  trafficBroadcastCreate.value='';
};
function clearInputTraffic(){
  trafficSubnetCreate.value='';
  trafficEth0Create.value='';
  trafficDHCPCreate.value='';
  trafficBroadcastCreate.value='';
};
//BOTON CREAR NUEVA TERMINAL, ENVIAR NUEVA TERMINAL Y ASIGNACIÓN DE IP A LA BD
crearNuevaTerminal.onclick=async()=>{
  let dataNewTerminal;
    dataNewTerminal=new Object;
    dataNewTerminal.prefi=(ListaCompletaProyectos.find(a=>a._id==createProyecto.value)??'').prefi??'NON';    dataNewTerminal.contrato=(contratoCreate.value==''?'NONE':contratoCreate.value).trim().split(' ').join('').toUpperCase();
    dataNewTerminal.operador=operadorCreate.value;
    dataNewTerminal.idproyecto=createProyecto.value;
    dataNewTerminal.idservice=createServicePlan.value;
    dataNewTerminal.serieModem=(serieModemCreate.value==''?'NONE':serieModemCreate.value).trim().split(' ').join('').toUpperCase();
    dataNewTerminal.beam=createBeam.value;
    dataNewTerminal.longitud=getHMS(longitudCreate.value);
    dataNewTerminal.latitud=getHMS(latitudCreate.value);
    dataNewTerminal.adminSat0=(adminSat0Create.value==''?'NONE':adminSat0Create.value).trim().split(' ').join('').toUpperCase();
    dataNewTerminal.trafficSat0=(trafficSat0Create.value==''?'NONE':trafficSat0Create.value).trim().split(' ').join('').toUpperCase();
    dataNewTerminal.trafficSubnet=(trafficSubnetCreate.value==''?'NONE':trafficSubnetCreate.value).trim().split(' ').join('').toUpperCase();
    dataNewTerminal.trafficEth0=(trafficEth0Create.value==''?'NONE':trafficEth0Create.value).trim().split(' ').join('').toUpperCase();
    dataNewTerminal.trafficDHCP=(trafficDHCPCreate.value==''?'NONE':trafficDHCPCreate.value).trim().split(' ').join('').toUpperCase();
    dataNewTerminal.trafficBroadcast=(trafficBroadcastCreate.value==''?'NONE':trafficBroadcastCreate.value).trim().split(' ').join('').toUpperCase();
    dataNewTerminal.num=ListaCompletaTerminales.length+1;
    dataNewTerminal.fechaCreacion=(()=>{
      let date=new Date();
      console.log(date,'date');
      let dia,mes,año;
      dia=date.getDate()<10?'0'+date.getDate():date.getDate();
      let mesNumero=Number (date.getMonth()+1);
      mes=mesNumero<10?'0'+mesNumero:mesNumero;
      año=date.getFullYear();
      return `${año}/${mes}/${dia}`; // YYYY/MM/DD
    })();
    console.log(dataNewTerminal,'objeto creado');
    let result=await postNewTerminal(dataNewTerminal);
    console.log(result);
    //Validar IP ADMIN, TRAFFIC y ETH SI EXISTEN O CREAR UNO NUEVO
    let adminSat0Data=listaIpsAdminSat0.find(a=>a.ip==dataNewTerminal.adminSat0)??'';
    let trafficSat0Data=listaIpsTrafficSat0.find(a=>a.ip==dataNewTerminal.trafficSat0)??'';
    let trafficSubNetData=listaIpsPool.find(a=>a.ip==dataNewTerminal.trafficSubnet)??'';
    let resultIp,resultIpAdmin,resultTraffic;
    //validación de AdminSat0
    if(adminSat0Data){
      adminSat0Data.siteAssing=result._id;
      resultIpAdmin=await patchIp(APIurlIpsAdminSat0,adminSat0Data);
      console.log(resultIpAdmin,'adminSat0Data find');
    }else{
      adminSat0Data=new Object;
      adminSat0Data.ip=dataNewTerminal.adminSat0;
      adminSat0Data.siteAssing=result._id;
      resultIpAdmin=await postIp(APIurlIpsAdminSat0,adminSat0Data);
      console.log(resultIpAdmin,'adminSat0Data create');
    };
    //validación de trafficSat0
    if(trafficSat0Data){
      trafficSat0Data.siteAssing=result._id;
      resultTraffic=await patchIp(APIurlIpsTrafficSat0,trafficSat0Data);
      console.log(resultTraffic,'trafficSat0Data find');
    }else{
      trafficSat0Data=new Object;
      trafficSat0Data.ip=dataNewTerminal.trafficSat0;
      trafficSat0Data.proyectoAssing=dataNewTerminal.idproyecto=='635465c9aa3435afb96b3b92'?dataNewTerminal.idproyecto:defaultId;
      trafficSat0Data.siteAssing=result._id;
      resultTraffic=await postIp(APIurlIpsTrafficSat0,trafficSat0Data);
      console.log(resultTraffic,'trafficSat0Data create');
    };
    //validación de trafficEth
    if(trafficSubNetData){
      trafficSubNetData.siteAssing=result._id;
      resultIp=await patchIp(APIurlIpsPool,trafficSubNetData);
      console.log(resultIp,'trafficSubNetData find');
    }else{
      trafficSubNetData=new Object;
      trafficSubNetData.ip=dataNewTerminal.trafficSubnet;
      trafficSubNetData.proyectoAssing=dataNewTerminal.idproyecto;
      trafficSubNetData.siteAssing=result._id;
      resultIp=await postIp(APIurlIpsPool,trafficSubNetData);
      console.log(resultIp,'trafficSubNetData create');
    };
    crearNuevaTerminal.disabled=true;
    crearNuevaTerminal.style.display='none';
    mensajeCreacion.innerHTML='TERMINAL CREADA';
    await getInfoFromMongoDb();
    body.style.position = "static";
    body.style.height = "100%";
    body.style.overflow = "hidden"; 
    window.addEventListener("keyup",validateFormulario);
};
  //EVENTO PARA VALIDAR CLICK EN SPAN DE CLOSE PARA CERRAR MODAL CREACION TERMINAL
closeCreacion.onclick=function(){
    modalCreacionTerminal.style.display = "none";
    crearNuevaTerminal.disabled=false;
    crearNuevaTerminal.style.display='block'
    body.style.position = "inherit";
    body.style.height = "auto";
    body.style.overflow = "visible";
};     
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //CREAR ARCHIVO XLSX DE LA VISTA ACTUAL DE SITIOS
crearXlsx.onclick=()=>{
  console.log('descarga');
  let service, proyecto, idTerminal, exportList;
  exportList=listaTerminalesBusqueda;
  exportList.map(objeto=>{
    idTerminal=objeto._id;
    service=objeto.idservice;
    proyecto=objeto.idproyecto;
    delete objeto.idservice;
    delete objeto.idproyecto;
    objeto=Object.assign(objeto,service);
    objeto=Object.assign(objeto,proyecto);
    objeto._id=idTerminal;
    delete objeto.__v;
  });
  exportWorkSheet(exportList);
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//FUNCIONES PARA LOS MODALES CREACION DE NUEVA TERMINAL
  //FUNCION ABRIR EL MODAL DE LA CREACION DE TERMINAL
function openModalCreacionTerminal(){
  modalCreacionTerminal.style.display = "block";
  body.style.position = "static";
  body.style.height = "100%";
  body.style.overflow = "hidden"; 
  createServicePlan.innerHTML=domCreatorModificarSelectServicePlan();
  createProyecto.innerHTML=domCreatorModificarSelectProyecto();
  createBeam.innerHTML=domCreatorModificarSelectBeams();
  operadorCreate.innerHTML=domCreatorModificarSelectOperadores();
  crearNuevaTerminal.disabled=true;
  infoRepetido.style.display='none';
  crearNuevaTerminal.style.display='block';
  mensajeCreacion.innerHTML='LLENAR TODOS LOS CAMPOS PARA CREAR NUEVA TERMINAL';
};
  //FUNCION PARA BUSCAR IP LIBRE DE LISTA Y CALCULAR SU DHCP
function findIp(proyectoId,callback){
  let ip;
  let adminSat0;
  let trafficSat0;
  let returnCallback;
  let mask=(ListaCompletaProyectos.find(a=>a._id==proyectoId)??'').mascaraSubred??'29'; //SACAR MASCARA DEL PLAN
  ip=listaIpsPool.find(a=>a.proyectoAssing==proyectoId&&a.siteAssing==defaultId); //BUSCAR primer SUBNET disponible
  adminSat0=listaIpsAdminSat0.find(a=>a.siteAssing==defaultId);//buscar el primer admin sat0 disponible
  adminSat0Create.value=adminSat0.ip;  
  trafficSat0=listaIpsTrafficSat0.find(a=>a.proyectoAssing==defaultId&&a.siteAssing==defaultId);
  trafficSubnetCreate.value=ip.ip;  
  trafficSat0Create.value=trafficSat0.ip;
  returnCallback=callback(ip.ip,mask);
  return returnCallback;
};
  //FUNCION QUE VALDA CAMBIOS INPUT Y REVISE REQUIRED Y 
function validateFormulario(){
  if(crearNuevaTerminal.style.display!=='none'){
    //VALIDAR SI EL CONTRATO ESTA REPETIDO
    if(contratoCreate.value){
      if(!contratoCreate.validity.patternMismatch){
        var findContrato=ListaCompletaTerminales.find(a=>a.contrato==contratoCreate.value)??'';
        console.log(findContrato,'contrato repetido');        
      };
    };  
    //VALIDAR SI ESTA REPETIDO LA SERIE
    if(serieModemCreate.value){
      if(!serieModemCreate.validity.patternMismatch){
        var findSerie=ListaCompletaTerminales.find(a=>a.serieModem==serieModemCreate.value)??'';
        console.log(findSerie,'serie repetido');        
      };
    };
    if(findContrato||findSerie){
      crearNuevaTerminal.disabled=true;
      infoRepetido.style.display='block';
      if(findContrato){
        infoRepetido.innerHTML='CONTRATO REPETIDO';
      };
      if(findSerie){
        infoRepetido.innerHTML=`SERIE DE MODEM YA EXISTE EN EL CONTRATO ${findSerie.contrato}`;
      };
    }else{
      infoRepetido.style.display='none';
      crearNuevaTerminal.disabled=false;
      mensajeCreacion.innerHTML='INFORMACION LISTA PARA CREAR TERMINAL';
    };                
    if(contratoCreate.value&&serieModemCreate.value
      &&longitudCreate.value&&latitudCreate.value
      &&adminSat0Create.value&&trafficSat0Create.value
      &&trafficSubnetCreate.value&&trafficEth0Create.value
      &&trafficDHCPCreate.value&&trafficBroadcastCreate.value){  
        if(contratoCreate.validity.patternMismatch
          ||longitudCreate.validity.patternMismatch
          ||latitudCreate.validity.patternMismatch
          ||adminSat0Create.validity.patternMismatch
          ||trafficSat0Create.validity.patternMismatch
          ||trafficSubnetCreate.validity.patternMismatch
          ||trafficEth0Create.validity.patternMismatch
          ||trafficDHCPCreate.validity.patternMismatch
          ||trafficBroadcastCreate.validity.patternMismatch
          ||serieModemCreate.validity.patternMismatch){
              crearNuevaTerminal.disabled=true;
              mensajeCreacion.innerHTML='UNO O VARIOS CAMPOS AUN SON INVALIDOS';
        }else{
          if(findContrato||findSerie){
            crearNuevaTerminal.disabled=true;
            infoRepetido.style.display='block';
            if(findContrato){
              infoRepetido.innerHTML='CONTRATO REPETIDO';
            };
            if(findSerie){
              infoRepetido.innerHTML=`SERIE DE MODEM YA EXISTE EN EL CONTRATO ${findSerie.contrato}`;
            };
          }else{
            infoRepetido.style.display='none';
            crearNuevaTerminal.disabled=false;
            mensajeCreacion.innerHTML='INFORMACION LISTA PARA CREAR TERMINAL';
          };              
        };         
    }else{
      crearNuevaTerminal.disabled=true;
      mensajeCreacion.innerHTML='LLENAR TODOS LOS CAMPOS PARA CREAR NUEVA TERMINAL';
    };
  };        
};
  //OBTENER DHCP DE UNA IP DADA
function getsDHCP(ip,mask){ 
  console.log(mask,'mascara'); 
  let maskDecimal;
  let numHost;
  let DHCP=new Object;
  let trafficEth0,trafficBroadcast,trafficDHCP;
  switch (mask){
    case '29':   
        maskDecimal='255.255.255.248';
        numHost='8'; 
        break;
    case '30':   
        maskDecimal='255.255.255.252';
        numHost='4';
        break;    
    default:
        break;
    };
    // ultimo octeto
    let ipSplit=ip.split('.');
    let lastOctet=ipSplit[3];
    lastOctet=Number(lastOctet);
    // ip módem
    let ipGw=ipSplit[3];
    ipGw=Number(ipGw)+1;
    trafficEth0=`${ipSplit[0]}.${ipSplit[1]}.${ipSplit[2]}.${ipGw}`;
    DHCP.trafficEth0=trafficEth0;
    console.log('trafficEth0',trafficEth0);    
    // DHCP
    let ipDHCP=ipSplit[3];
    let ipDHCPb=Number(ipDHCP)+2;
    let ipDHCPB=(Number(ipDHCP)+Number(numHost))-2;
    console.log(ipDHCPB);
    trafficDHCP=`${ipSplit[0]}.${ipSplit[1]}.${ipSplit[2]}.${ipDHCPb}-${ipSplit[0]}.${ipSplit[1]}.${ipSplit[2]}.${ipDHCPB}`
    DHCP.trafficDHCP=trafficDHCP;
    console.log('trafficDHCP',trafficDHCP);
    // ip broadcast
    let ipBroadcast=ipSplit[3]
    ipBroadcast=Number(ipBroadcast)
    ipBroadcast=(Number(ipBroadcast)+Number(numHost))-1;
    trafficBroadcast=`${ipSplit[0]}.${ipSplit[1]}.${ipSplit[2]}.${ipBroadcast}`;
    DHCP.trafficBroadcast=trafficBroadcast;
    console.log('trafficBroadcast',trafficBroadcast);
    return DHCP;
};
  //CONVERTIR COORDENADAS DECIMALES A H° M' S''
function getHMS(coordenadas){
  let puntoCardinal,horas,minutos,segundos;
  coordenadas=Number(coordenadas);
  if(coordenadas>0){
    puntoCardinal='N';
  }else{
    puntoCardinal='W';
  };    
    horas=Math.floor(coordenadas*1);
    console.log(horas,'horas');
    minutos=Math.floor((coordenadas-horas)*60);
    segundos=((((coordenadas-horas)*60)-minutos)*60);
    horas=Math.abs(horas);
    return `${horas}° ${minutos}' ${segundos.toFixed(2)}'' ${puntoCardinal}`
};  
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//FUNCIONES PARA LOS MODALES MOSTRAR INFORMACIÓN/MODIFICAR INFORMACIÓN
  //FUNCION PARA CREAR TODA LA INTERFAZ DEL MODAL INFORMCIÓN
  //FUNCION PRINCIPAL DEL MODAL DONDE EXISTEN LAS FUNCIONES INTERNAS DE MODIFICACION, CONSULTA Y ELIMINACION
function openCloseModalInfo(terminalId,data){
  innerHTMLAplication(terminalId,data??ListaCompletaTerminales);
  prepararServicePlanMenu();
  console.log(terminalId);
  //elementos html creados despues por el domcreator
  const caret=document.getElementById("caret");
  const caretIcon=document.getElementById("caretIcon");
  const divMidModalPMOC=document.querySelector('.div_mid_modal_PMOC');
  const divMidModalPMOC2=document.querySelector('.div_mid_modal_PMOC_2');
    //inputs IPS
  const trafficSubnet=document.getElementById('trafficSubnet');
  const trafficEth0=document.getElementById('trafficEth0');
  const trafficDHCP=document.getElementById('trafficDHCP');
  const trafficBroadcast=document.getElementById('trafficBroadcast');
    //resetear valores PMOC
  resetearValoresInputsPMOC();
  //ABRIR MODAL
  abrirModalInfo();
    //CERRAR MODAL
      span.onclick=function() {
          modal.style.display = "none";
          eliminarTerminalMensaje.style.display='none';
          eliminarTerminal.disabled=false;
          aplicarCambios.disabled=false;
          body.style.position = "inherit";
          body.style.height = "auto";
          body.style.overflow = "visible";
          window.removeEventListener('keyup',handler);
          window.removeEventListener('keyup',validarPattern);              
      };    
      window.onclick=function(event) {
          if (event.target == modal) {
              modal.style.display = "none";    
              eliminarTerminalMensaje.style.display='none';
              eliminarTerminal.disabled=false;
              aplicarCambios.disabled=false;
              body.style.position = "inherit";
              body.style.height = "auto";
              body.style.overflow = "visible";
              window.removeEventListener('keyup',handler);
              window.removeEventListener('keyup',validarPattern);
          };            
      };
    //ABRIR CERRAR CARET INFORMACIÖN PMOC
      caret.onclick=()=>{
        if(divMidModalPMOC.style.display=='none'){
          divMidModalPMOC.style.display='flex';
          divMidModalPMOC2.style.display='flex';
          caretIcon.classList.remove('bi-caret-left');
          caretIcon.classList.add('bi-caret-down');

        }else{
          divMidModalPMOC.style.display='none';
          divMidModalPMOC2.style.display='none';
          caretIcon.classList.remove('bi-caret-down');
          caretIcon.classList.add('bi-caret-left');
        };
      };
    //CABIAR DIV SELECTOR MODIFICAR / CAMBIAR
      modificarMenu.addEventListener('change',(event)=>{
        switch (event.target.value){
          case 'ServicePlan':
            eliminarTerminalMensaje.style.display='none';
            aplicarCambios.disabled=false;
            searchServicePlan.style.display='block';
            Ips.style.display='none';
            InfoPMOC.style.display='none';
            aplicarCambios.style.display='block';
            eliminarTerminal.style.display='none';
            window.removeEventListener('keyup',handler);
            window.removeEventListener('keyup',validarPattern);
            break;
          case 'IP':
            aplicarCambios.disabled=true;
            eliminarTerminalMensaje.style.display='none';
            searchServicePlan.style.display='none';
            Ips.style.display='flex';
            InfoPMOC.style.display='none';
            aplicarCambios.style.display='block';
            eliminarTerminal.style.display='none';   
            window.addEventListener("keyup",handler);
            window.removeEventListener('keyup',validarPattern);
            break; 
          case 'PMOC':
            eliminarTerminalMensaje.style.display='none';
            searchServicePlan.style.display='none';
            Ips.style.display='none';
            InfoPMOC.style.display='block';
            aplicarCambios.style.display='block';
            eliminarTerminal.style.display='none';
            validarPattern();
            window.removeEventListener('keyup',handler);
            window.addEventListener('keyup',validarPattern);              
            break;
          case 'Eliminar':
            searchServicePlan.style.display='none';
            Ips.style.display='none';
            InfoPMOC.style.display='none';
            aplicarCambios.style.display='none';
            eliminarTerminalMensaje.style.display='none';
            eliminarTerminal.style.display='block';
            window.removeEventListener('keyup',handler);
            window.removeEventListener('keyup',validarPattern);
        };
      });
    //BOTON APLICAR CAMBIOS  
      aplicarCambios.onclick=()=>{cambiosAplicados(terminalId)};      
    //BOTON ELIMINAR TERMINAL  
      eliminarTerminal.onclick=()=>{terminalEliminar(terminalId)};
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //FUNCION LISTENER PARA CALCULAR Y BUSCAR IPS INGRESADAS EN TRAFFIC SUBNET
async function terminalEliminar(terminalId){  
  eliminarTerminalMensaje.style.display='none';
  window.removeEventListener('keyup',handler);
  window.removeEventListener('keyup',validarPattern);
  let terminal=ListaCompletaTerminales.find(a=>a._id==terminalId);
  let adminSat0Data=listaIpsAdminSat0.find(a=>a.ip==terminal.adminSat0)??'';
  let trafficSat0Data=listaIpsTrafficSat0.find(a=>a.ip==terminal.trafficSat0)??'';
  let trafficSubNetData=listaIpsPool.find(a=>a.ip==terminal.trafficSubnet)??'';
  adminSat0Data.siteAssing=defaultId;
  trafficSat0Data.siteAssing=defaultId;
  trafficSubNetData.siteAssing=defaultId;
  await patchIp(APIurlIpsPool,trafficSubNetData);
  await patchIp(APIurlIpsAdminSat0,adminSat0Data);
  await patchIp(APIurlIpsTrafficSat0,trafficSat0Data);
  let result=await deleteTerminalByID(terminalId);
  console.log(terminalId,result,'delete');
  eliminarTerminalMensaje.style.display='block';
  eliminarTerminalMensaje.innerHTML='TERMINAL ELIMINADA';
  eliminarTerminal.disabled=true;
  aplicarCambios.disabled=true;
  await getInfoFromMongoDb(); 
  body.style.position="static";
  body.style.height="100%";
  body.style.overflow="hidden";
};
  //FUNCION PARA ELIMINAR TERMINAL DESDE EL BOTON DE ELIMINAR
function handler(){
  let foundIp='';
  let foundcontrato='';
  let foundProyecto='';
  let dhcpFound='';
  foundIp=listaIpsPool.find(a=>a.ip==trafficSubnet.value)??'';
  console.log(foundIp);
  if(foundIp.siteAssing==defaultId){
            eliminarTerminalMensaje.style.display='block';
            foundProyecto=ListaCompletaProyectos.find(a=>a._id==foundIp.proyectoAssing)??'';
            eliminarTerminalMensaje.innerHTML=`Ip disponible POOL ${foundProyecto.nombreProyecto??'CORPORATIVO GENERAL'}`;
            dhcpFound=getsDHCP(foundIp.ip,foundProyecto.mascaraSubred);
            trafficDHCP.value=dhcpFound.trafficDHCP;
            trafficEth0.value=dhcpFound.trafficEth0;
            trafficBroadcast.value=dhcpFound.trafficBroadcast;
            if(trafficDHCP.validity.patternMismatch
              ||trafficEth0.validity.patternMismatch
              ||trafficBroadcast.validity.patternMismatch
              ||trafficSubnet.validity.patternMismatch
              ||trafficDHCP.validity.valueMissing
              ||trafficEth0.validity.valueMissing
              ||trafficBroadcast.validity.valueMissing
              ||trafficSubnet.validity.valueMissing){
                  aplicarCambios.disabled=true;
                  eliminarTerminalMensaje.style.display='block';
                  eliminarTerminalMensaje.innerHTML='UNO O VARIOS CAMPOS SON INVALIDOS O ESTAN VACIOS';
            }else{
              aplicarCambios.disabled=false;
            };
  }else if(!foundIp.siteAssing){
            aplicarCambios.disabled=true;
            eliminarTerminalMensaje.style.display='block';
            eliminarTerminalMensaje.innerHTML='no existe Ip como subred';
  }else if(foundIp.siteAssing!=defaultId){
            aplicarCambios.disabled=true;
            eliminarTerminalMensaje.style.display='block';
            foundcontrato=ListaCompletaTerminales.find(a=>a._id==foundIp.siteAssing)??'';
            foundProyecto=ListaCompletaProyectos.find(a=>a._id==foundIp.proyectoAssing)??'';
            eliminarTerminalMensaje.innerHTML=`ip ocupada por el contrato ${foundcontrato.contrato} y proyecto ${foundProyecto.nombreProyecto??'CORPORATIVO GENERAL'}`;
  };  
};
  //VALIDAR PATTERN DE INPUTS OPENCLOSE MODAL INFO
function validarPattern(){
  if(siteID.validity.patternMismatch
    ||confirmationCode.validity.patternMismatch
    ||maxPowerdBm.validity.patternMismatch
    ||p1dBdBm.validity.patternMismatch
    ||xPol.validity.patternMismatch
    ||powerFootroom.validity.patternMismatch
    ||powerHeadroom.validity.patternMismatch){
        aplicarCambios.disabled=true;
        eliminarTerminalMensaje.style.display='block';
        eliminarTerminalMensaje.innerHTML='UNO O VARIOS CAMPOS SON INVALIDOS';
  }else{
        aplicarCambios.disabled=false;
        eliminarTerminalMensaje.style.display='none';
  };
};
  //ENVIAR CAMBIOS A LA BASE DE DATOS DESDE EL BOTON APLICAR CAMBIOS DEL MODAL INFO
async function cambiosAplicados(terminalId){  
  eliminarTerminalMensaje.style.display='none';
  window.removeEventListener('keyup',handler);
  window.removeEventListener('keyup',validarPattern);
  let terminalById;
  let result;
  switch (modificarMenu.value){
    case 'ServicePlan':
        console.log('ServicePlan');
        terminalById=ListaCompletaTerminales.find(id=>id._id==terminalId);
          //cambio de parametro
        terminalById.idservice=searchServicePlan.value;
        result=await patchTerminalByID(terminalById);
        console.log(result);                               
      break;
    case 'IP':
        console.log('IP');
        terminalById=ListaCompletaTerminales.find(id=>id._id==terminalId);
          //cambio de parametros
          let modifyIp=listaIpsPool.find(a=>a.ip==terminalById.trafficSubnet)??'';
          modifyIp.siteAssing=defaultId;
          await patchIp(APIurlIpsPool,modifyIp);
        terminalById.trafficSubnet=(trafficSubnet.value==''?terminalById.trafficSubnet:trafficSubnet.value).split(' ').join('');
          modifyIp=listaIpsPool.find(a=>a.ip==terminalById.trafficSubnet)??'';
          modifyIp.siteAssing=terminalById._id;
          await patchIp(APIurlIpsPool,modifyIp);
        terminalById.trafficDHCP=(trafficDHCP.value==''?terminalById.trafficDHCP:trafficDHCP.value).split(' ').join('');
        terminalById.trafficEth0=(trafficEth0.value==''?terminalById.trafficEth0:trafficEth0.value).split(' ').join('');
        terminalById.trafficBroadcast=(trafficBroadcast.value==''?terminalById.trafficBroadcast:trafficBroadcast.value).split(' ').join('');
        result=await patchTerminalByID(terminalById);
        console.log(result);                
      break; 
    case 'PMOC':
      console.log('PMOC');
      terminalById=ListaCompletaTerminales.find(id=>id._id==terminalId);
        //cambio de parametros
        let cambioActivación=terminalById.fechaActivacion;
      terminalById.siteID=(siteID.value==''?terminalById.siteID:siteID.value).trim().toUpperCase();
      terminalById.confirmationCode=(confirmationCode.value==''?terminalById.confirmationCode:confirmationCode.value).trim().toUpperCase();
      terminalById.maxPowerdBm=(maxPowerdBm.value==''?terminalById.maxPowerdBm:maxPowerdBm.value).trim().toUpperCase();
      terminalById.p1dBdBm=(p1dBdBm.value==''?terminalById.p1dBdBm:p1dBdBm.value).trim().toUpperCase();
      terminalById.xPol=(xPol.value==''?terminalById.xPol:xPol.value).trim().toUpperCase();
      terminalById.powerFootroom=(powerFootroom.value==''?terminalById.powerFootroom:powerFootroom.value).trim().toUpperCase();
      terminalById.powerHeadroom=(powerHeadroom.value==''?terminalById.powerHeadroom:powerHeadroom.value).trim().toUpperCase();
      terminalById.fechaActivacion=(fechaActivacion.value==''?terminalById.fechaActivacion:fechaActivacion.value.split('-').join('/'));
      if(cambioActivación!=terminalById.fechaActivacion){ //CAMBIO DE ESTATUS A ACTIVA AL CAMBIAR LA FECHA DE PENDIENTE
        terminalById.estatus='ACTIVA';
      };
      result=await patchTerminalByID(terminalById);
      console.log(result);
    break;
  };
  // recargar información del modal
  recargarModal(terminalId);  
};
  //FUNCIONES PARA CREAR DOM
function innerHTMLAplication(terminalId,data){
  informacionPrincipalTerminal.innerHTML=domCreatorDivModalInfoTerminal(terminalId,data);
  searchServicePlan.innerHTML=domCreatorModificarSelectServicePlan();
  Ips.innerHTML=domCreatorModificarIPs(terminalId,data);  
};
  //FUNCION PARA CREAR MENU CON LOS SERVICE PLAN
function prepararServicePlanMenu(){
    modificarMenu.value='ServicePlan';
    searchServicePlan.style.display='block';
    Ips.style.display='none';
    InfoPMOC.style.display='none';
    aplicarCambios.style.display='block';
    eliminarTerminal.style.display='none';
};
  //FUNCION QUE HABILITA EL MODAL EN EL HTML
function abrirModalInfo(){
  modal.style.display = "block";
  body.style.position = "static";
  body.style.height = "100%";
  body.style.overflow = "hidden";  
};
  //FUNCION PARA RESETEAR VALORES DE INPUTS PMOC
function resetearValoresInputsPMOC(){
    siteID.value='';
    confirmationCode.value='';
    maxPowerdBm.value='';
    p1dBdBm.value='';
    xPol.value='';
    powerFootroom.value='';
    powerHeadroom.value='';
    fechaActivacion.value='';
};
  //FUNCION PARA REFRESCAR LA INFORMACION DEL MODAL SIN CERRARLA DESPUES DE MODIFICAR/ELIMINAR INFORMACION
async function recargarModal(terminalId){    
  await getInfoFromMongoDb();
  openCloseModalInfo(terminalId,ListaCompletaTerminales);
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//FUNCIONES MANIPULAR EL DOM
  //CREAR LAS TABLAS DE TERMINALES EN LA INTERFAZ PRINCIPAL
function domCreatorTablasListaTerminales(data){ 
    let num=1;  
    console.log(data)
    let domCreated=`
        ${data.map(terminal=>`
            <tr>
                <td>${num++}</td>
                <td>${terminal.contrato}</td>
                <td>${terminal.estatus}</td>
                <td>${terminal.nombreRemota}</td>
                <td>${terminal.idproyecto.nombreProyecto}</td>
                <td>${terminal.idservice.nombreServicePlan}</td>
                <td>${terminal.serieModem}</td>
                <td>${terminal.beam}</td>
                <td>${terminal.latitud}</td>
                <td>${terminal.longitud}</td>
                <td>${terminal.trafficEth0}</td>
                <td>${terminal.siteID}</td>
            <td>
            <button onClick="openCloseModalInfo('${terminal._id}')" id="btn_modal_info"<i class="bi bi-display"></i></button>                        
            </td>        
        `).join('')}    
    `;
    return domCreated;
};
  //CREAR INFORMACIÓN DEL MÓDAL
function domCreatorDivModalInfoTerminal(terminalId,data){
    let objectDomToCreate=data.find(id=>id._id==terminalId);
    let objectInfoBeamDomToCreate=infoBeam.find(beam=>objectDomToCreate.beam==beam.beam);
    console.log(objectDomToCreate);
    let domCreated=`
        <div class="div_mid_modal">        
            <div class="div_low_modal"> 
              <b>contrato</b>
              <p>${objectDomToCreate.contrato}</p>
            </div>
            <div class="div_low_modal">
              <b>estatus</b>
              <p>${objectDomToCreate.estatus}</p>
            </div>
            <div class="div_low_modal">
              <b>idCliente</b>
              <p>${objectDomToCreate.idCliente}</p>
            </div>
            <div class="div_low_modal">
              <b>nombreProyecto</b>
              <p>${objectDomToCreate.idproyecto.nombreProyecto}</p>
            </div>
            <div class="div_low_modal">
              <b>serieModem</b>
              <p>${objectDomToCreate.serieModem}</p>
            </div>            
            <div class="div_low_modal">
              <b>operador</b>
              <p>${objectDomToCreate.operador}</p>
            </div>   
        </div>
        <div class="div_mid_modal">  
            <div class="div_low_modal">
              <b>nombreServicePlan</b>
              <p>${objectDomToCreate.idservice.nombreServicePlan}</p>
            </div>
            <div class="div_low_modal">
                <b>mirOut</b>
                <p>${objectDomToCreate.idservice.mirOut}</p>
            </div>
            <div class="div_low_modal">
              <b>mirIn</b>
              <p>${objectDomToCreate.idservice.mirIn}</p>
            </div>
            <div class="div_low_modal">
              <b>cirOut</b>
              <p>${objectDomToCreate.idservice.cirOut}</p>
            </div>      
            <div class="div_low_modal">
              <b>cirIn</b>
              <p>${objectDomToCreate.idservice.cirIn}</p>
            </div>  
        </div>
        <div class="div_mid_modal">            
            <div class="div_low_modal">
              <b>beam</b>
              <p>${objectDomToCreate.beam}</p>
            </div>
             <div class="div_low_modal">
              <b>latitud</b>
              <p>${objectDomToCreate.latitud}</p>
            </div>
            <div class="div_low_modal">
              <b>longitud</b>
              <p>${objectDomToCreate.longitud}</p>
            </div>           
            <div class="div_low_modal">
              <b>fechaCreacion</b>
              <p>${objectDomToCreate.fechaCreacion}</p>
            </div>
            <div class="div_low_modal">
              <b>fechaActivacion</b>
              <p>${objectDomToCreate.fechaActivacion}</p>
            </div>  
        </div>
        <div class="div_mid_modal">             
            <div class="div_low_modal">
              <b>trafficSVN</b>
              <p>${objectDomToCreate.idproyecto.trafficSVN}</p>
            </div>
            <div class="div_low_modal">
              <b>mascaraSubred</b>
              <p>${objectDomToCreate.idproyecto.mascaraSubred}</p>
            </div>
            <div class="div_low_modal">
              <b>adminSat0</b>
              <p>${objectDomToCreate.adminSat0}</p>
            </div>
            <div class="div_low_modal">
              <b>trafficSat0</b>
              <p>${objectDomToCreate.trafficSat0}</p>
            </div>           
        </div>
        <div class="div_mid_modal">  
         <div class="div_low_modal">
              <b>trafficSubnet</b>
              <p>${objectDomToCreate.trafficSubnet}</p>
            </div>
            <div class="div_low_modal">
              <b>trafficEth0</b>
              <p>${objectDomToCreate.trafficEth0}</p>
            </div>            
            <div class="div_low_modal">
              <b>trafficDHCP</b>
              <p>${objectDomToCreate.trafficDHCP}</p>
            </div>
            <div class="div_low_modal">
              <b>trafficBroadcast</b>
              <p>${objectDomToCreate.trafficBroadcast}</p>
            </div>
        </div>  
  <div class="menu_info_PMOC">  
  <span id="caret" class="caret"><i id="caretIcon" class="bi bi-caret-left"></i></span> <h2>Información PMOC</h2>
        <div class="div_mid_modal_PMOC" style="display: none;">               
            <div class="div_low_modal">
              <b>siteID</b>
              <p>${objectDomToCreate.siteID}</p>
            </div>
            <div class="div_low_modal">
              <b>confirmationCode</b>
              <p>${objectDomToCreate.confirmationCode}</p>
            </div>
            <div class="div_low_modal">
              <b>maxPowerdBm</b>
              <p>${objectDomToCreate.maxPowerdBm}</p>
            </div>
            <div class="div_low_modal">
              <b>p1dBdBm</b>
              <p>${objectDomToCreate.p1dBdBm}</p>
            </div>
            <div class="div_low_modal">
              <b>xPol</b>
              <p>${objectDomToCreate.xPol}</p>
            </div>
            <div class="div_low_modal">
              <b>powerFootroom</b>
              <p>${objectDomToCreate.powerFootroom}</p>
            </div>
            <div class="div_low_modal">
              <b>powerHeadroom</b>
              <p>${objectDomToCreate.powerHeadroom}</p>
            </div>            
        </div>
        <div class="div_mid_modal_PMOC_2" style="display: none;">               
            <div class="div_low_modal">
              <b>beam</b>
              <p>${objectInfoBeamDomToCreate.beam}</p>
            </div>
            <div class="div_low_modal">
              <b>satelliteLocation</b>
              <p>${objectInfoBeamDomToCreate.satelliteLocation}</p>
            </div>
            <div class="div_low_modal">
              <b>downlink</b>
              <p>${objectInfoBeamDomToCreate.downlink}</p>
            </div>
            <div class="div_low_modal">
              <b>srKsym</b>
              <p>${objectInfoBeamDomToCreate.srKsym}</p>
            </div>
            <div class="div_low_modal">
              <b>downlinkFreq</b>
              <p>${objectInfoBeamDomToCreate.downlinkFreq}</p>
            </div>
            <div class="div_low_modal">
              <b>ibXprd</b>
              <p>${objectInfoBeamDomToCreate.ibXprd}</p>
            </div>                     
        </div>
  </div>          
        `;
    return domCreated;
};
  //CREAR MENU DE SERVICE PLAN
function domCreatorModificarSelectServicePlan(){
  let domCreated=`
  ${ListaCompletaServicePlan.map(servicePlan=>`
  <option value="${servicePlan._id}" >${servicePlan.nombreServicePlan}</option>
  `).join('')}`;
  return domCreated;
};
  //CREAR MENU DE PROYECTOS
function domCreatorModificarSelectProyecto(){
  let domCreated=`
  ${ListaCompletaProyectos.map(proyecto=>`
  <option value="${proyecto._id}" >${proyecto.nombreProyecto}</option>
  `).join('')}`;
  return domCreated;
};
  //CREAR MENU DE BEAMS
function domCreatorModificarSelectBeams(){
  let domCreated=`
  ${infoBeam.map(beam=>`
  <option value="${beam.beam}" >${beam.beam}</option>
  `).join('')}`;
  return domCreated;
};
//CREAR MENU DE OPERADORES
function domCreatorModificarSelectOperadores(){
  let domCreated=`
  ${operadores.map(beam=>`
  <option value="${beam}" >${beam}</option>
  `).join('')}`;
  return domCreated;
};
  //CREAR INPUTS PARA MODIFICAR IPS
function domCreatorModificarIPs(terminalId,data){
  let objectDomToCreate=data.find(id=>id._id==terminalId);
  let domCreated=`  
  <div class="div_ips_info">
      <div>
        <p>trafficSubnet</p>
          <input id="trafficSubnet" type="text" placeholder="trafficSubnet" value="${objectDomToCreate.trafficSubnet}" required pattern="[0-9]{1,3}[.]{1}[0-9]{1,3}[.]{1}[0-9]{1,3}[.]{1}[0-9]{1,3}" title="xxx.xxx.xxx.xxx">
      </div>
      <div>
        <p>trafficEth0</p>
          <input id="trafficEth0" type="text" placeholder="trafficEth0" value="${objectDomToCreate.trafficEth0}" required pattern="[0-9]{1,3}[.]{1}[0-9]{1,3}[.]{1}[0-9]{1,3}[.]{1}[0-9]{1,3}" title="xxx.xxx.xxx.xxx">
      </div>      
  </div>  
  <div class="div_ips_info">
      <div>
        <p>trafficDHCP</p>
          <input id="trafficDHCP" type="text" placeholder="trafficDHCP" value="${objectDomToCreate.trafficDHCP}" required pattern="[0-9]{1,3}[.]{1}[0-9]{1,3}[.]{1}[0-9]{1,3}[.]{1}[0-9]{1,3}[-]{1}[0-9]{1,3}[.]{1}[0-9]{1,3}[.]{1}[0-9]{1,3}[.]{1}[0-9]{1,3}" title="xxx.xxx.xxx.xxx-xxx.xxx.xxx.xxx">
      </div>
      <div>
        <p>trafficBroadcast</p>
          <input id="trafficBroadcast" type="text" placeholder="trafficBroadcast" value="${objectDomToCreate.trafficBroadcast}" required pattern="[0-9]{1,3}[.]{1}[0-9]{1,3}[.]{1}[0-9]{1,3}[.]{1}[0-9]{1,3}" title="xxx.xxx.xxx.xxx">
      </div> 
  </div> 
  `;
  return domCreated;
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//FUNCION QUE INICIALIZA LA INTERFAZ DESPUES DE QUE WINDOWS LISTENER CARGE EL DOM, OBTIENEN TODA LA INFORMCAION DEL BACKEND POR PRIEMRA VEZ
async function getInfoFromMongoDb(){
  relleno.style.display='block';
  body.style.position = "static";
  body.style.height = "100%";
  body.style.overflow = "hidden"; 
  ListaCompletaTerminales=await getInfoFromBD(APIurlTerminales);
  ListaCompletaProyectos=await getInfoFromBD(APIurlProyecto);
  ListaCompletaServicePlan=await getInfoFromBD(APIurlServicePlan);
  infoBeam=await getInfoFromBD(APIurlInfoBeam);
  listaIpsPool=await getInfoFromBD(APIurlIpsPool);
  listaIpsAdminSat0=await getInfoFromBD(APIurlIpsAdminSat0);
  listaIpsTrafficSat0=await getInfoFromBD(APIurlIpsTrafficSat0);
  listaTerminalesBusqueda=ListaCompletaTerminales;
  //Organizar lista de Proyectos en orden Alfabetico
  ListaCompletaProyectos=ListaCompletaProyectos.sort(function(a,b){
    if (a.nombreProyecto>b.nombreProyecto){
      return 1;
    };
    if (a.nombreProyecto<b.nombreProyecto) {
      return -1;
    };
    return 0;
  });
  //Organizar lista de plan servicio
  ListaCompletaServicePlan=ListaCompletaServicePlan.sort(function(a,b){
    if (a.idservice>b.idservice){
      return 1;
    };
    if (a.idservice<b.idservice) {
      return -1;
    };
    return 0;
  });
  //organizar Beams en orden ascendente
  infoBeam=infoBeam.sort(function(a,b){
    if (a.beam>b.beam){
      return 1;
    };
    if (a.beam<b.beam) {
      return -1;
    };
    return 0;
  });
  tablaInformacionTerminales.innerHTML=domCreatorTablasListaTerminales(ListaCompletaTerminales);    
  footerTableGeneralInfo.innerHTML=`Total de terminales :${ListaCompletaTerminales.length}`;
  console.log(ListaCompletaTerminales,'GET INFO FROM MONGODB');
  console.log(ListaCompletaProyectos,'GET INFO FROM MONGODB');
  console.log(ListaCompletaServicePlan,'GET INFO FROM MONGODB');
  console.log(infoBeam,'GET INFO FROM MONGODB');
  console.log(listaIpsPool,'GET INFO FROM MONGODB');
  console.log(listaIpsAdminSat0,'GET INFO FROM MONGODB');
  console.log(listaIpsTrafficSat0,'GET INFO FROM MONGODB');
  relleno.style.display='none';
  body.style.position = "inherit";
  body.style.height = "auto";
  body.style.overflow = "visible";
};