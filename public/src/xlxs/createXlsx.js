function exportWorkSheet(objetoJson){
    console.log(objetoJson);
    let newDate=createDate();
    var newFile='list_SES.xlsx';
    var myWokSheet=XLSX.utils.json_to_sheet(objetoJson);
    var myWokBook=XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(myWokBook,myWokSheet,"newSheet");
    XLSX.writeFile(myWokBook,newFile);
};

function createDate(){
    let date=new Date();
    let dia,mes,año;
    dia=date.getDate()<10?'0'+date.getDate():date.getDate();
    mes=date.getMonth()<10?'0'+date.getMonth():date.getMonth();
    año=date.getFullYear();
    return `${año}/${mes}/${dia}`; // YYYY/MM/DD
  }