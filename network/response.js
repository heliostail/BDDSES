// const { faker } = require('@faker-js/faker');

function generateIdMessage(){
  return idMessage;
}

exports.success=function(res,data,status){
  res.status(status||200).send(data);
}
exports.error=function(res,error,status,details){
   console.error(details)
   res.status(status||500).send(error)
}