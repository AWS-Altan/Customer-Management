var imsi = context.getVariable("imsiResponse");
var be = context.getVariable("beidresponse");
var icc = context.getVariable("iccidResponse");
var imei = context.getVariable("imeiResponse");



if(typeof(imsi) !== 'undefined' && imsi !== null && imsi !== ""){
      print("imsi found");
      context.setVariable("imsi", imsi);
  }else{
      print("empty imsi");
    context.setVariable("imsi", "");
  }
  
if(typeof(be) !== 'undefined' && be !== null && be !== ""){
      print("be found");
      context.setVariable("be", be);
  }else{
      print("empty be");
    context.setVariable("be", "");
  }
  
if(typeof(icc) !== 'undefined' && icc !== null && icc !== ""){
      print("icc found");
      context.setVariable("icc", icc);
  }else{
      print("empty icc");
    context.setVariable("icc", "");
  }
  
 if(typeof(imei) !== 'undefined' && imei !== null && imei !== ""){
      print("imei found");
      context.setVariable("imei", imei);
  }else{
      print("empty imei");
    context.setVariable("imei", "");
  }   