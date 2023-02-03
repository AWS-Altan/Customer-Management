var imei = context.getVariable("imeiResponse");
imei = ((typeof(imei) !== 'undefined') && (imei !== null) && (imei !== "")) ? imei.toString() : "";

if(typeof(imei !== 'undefined') && (imei !== null) && (imei !== "" )){
    if(imei.includes("encontrada")){
        context.setVariable("imei", "");
    }else{
        var resImei = imei.substr(0,14);
        context.setVariable("imei", resImei);    
    }
}