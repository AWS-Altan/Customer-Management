var imei = context.getVariable("responseValidateHSS.imei");
imei = ((typeof(imei) !== 'undefined') && (imei !== null) && (imei !== "")) ? imei.toString() : "";

if(typeof(imei !== 'undefined') && (imei !== null) && (imei !== "" )){
    var resImei = imei.substr(0,14);
    context.setVariable("finalImei", resImei);
}else{
    context.setVariable("finalImei", "");
}