//tabla
const tablaInformacionTerminales=document.getElementById('tabla_informacion_terminales');
const footerTableGeneralInfo=document.getElementById('footer_table_general_info');
//Botones busqueda
const inputSearchContrato=document.getElementById('input_search_contrato');
const inputSearchSerieModem=document.getElementById('input_search_serieModem');
const inputSearchTrafficEth0=document.getElementById('input_search_trafficEth0');
const inputSearchGeneric=document.getElementById('input_search_generic');
const optionSearch=document.getElementById('optionSearch');
//Botones Modal
var modal=document.getElementById("myModal");
var span=document.getElementsByClassName("close")[0];
var body=document.getElementsByTagName("body")[0];
var informacionPrincipalTerminal=document.getElementById('informacion_principal_terminal');
var recharge=document.getElementById('recharge');
//modificar_borrar_terminal MODAL
var modificarMenu=document.getElementById('modificarMenu');
var ServicePlanInput=document.getElementById('ServicePlanInput');
var searchServicePlan=document.getElementById('searchServicePlan');
var Ips=document.getElementById('Ips');
var InfoPMOC=document.getElementById('InfoPMOC');
//botones
var aplicarCambios=document.getElementById('aplicarCambios');
var eliminarTerminal=document.getElementById('eliminarTerminal');
var eliminarTerminalMensaje=document.getElementById('eliminarTerminalMensaje');
//cambios/ingresar datos PMOC
var siteID=document.getElementById('siteID');
var confirmationCode=document.getElementById('confirmationCode');
var maxPowerdBm=document.getElementById('maxPowerdBm');
var p1dBdBm=document.getElementById('p1dBdBm');
var xPol=document.getElementById('xPol');
var powerFootroom=document.getElementById('powerFootroom');
var powerHeadroom=document.getElementById('powerHeadroom');
var fechaActivacion=document.getElementById('fechaActivacion');
//MODAL CREACION DE NUEVA TERMINAL
var modalCreacionTerminal=document.getElementById('modalCreacionTerminal');
var closeCreacion=document.getElementById('closeCreacion');
var crearTerminal=document.getElementById('crearTerminal');
    //MENUS SERVICE PLAN Y PROYECTOS
var createServicePlan=document.getElementById('createServicePlan');
var createProyecto=document.getElementById('createProyecto');    
    //INPUTS
var contratoCreate=document.getElementById('contratoCreate');
var operadorCreate=document.getElementById('operadorCreate');
var serieModemCreate=document.getElementById('serieModemCreate');
var beamCreate=document.getElementById('beamCreate');
var longitudCreate=document.getElementById('longitudCreate');
var latitudCreate=document.getElementById('latitudCreate');
var adminSat0Create=document.getElementById('adminSat0Create');
var trafficSat0Create=document.getElementById('trafficSat0Create');
var trafficSubnetCreate=document.getElementById('trafficSubnetCreate');
var trafficEth0Create=document.getElementById('trafficEth0Create');
var trafficDHCPCreate=document.getElementById('trafficDHCPCreate');
var trafficBroadcastCreate=document.getElementById('trafficBroadcastCreate');
//BOTON CREAR TERMINAL
var crearNuevaTerminal=document.getElementById('crearNuevaTerminal');
var mensajeCreacion=document.getElementById('mensajeCreacion');
var infoRepetido=document.getElementById('infoRepetido');
var createBeam=document.getElementById('createBeam');
//Boton de descarga
var crearXlsx=document.getElementById('crearXlsx');
//animación loading
var relleno=document.getElementById('relleno');