 var identifierValue = context.getVariable("identifierValue");
 var identifierType = context.getVariable("identifierType");
 
 identifierValue = ((typeof(identifierValue) !== 'undefined') && (identifierValue !== null) && (identifierValue !== "")) ? identifierValue.toString() : "";
 identifierType = ((typeof(identifierType) !== 'undefined') && (identifierType !== null) && (identifierType !== "")) ? identifierType.toString() : "";
 
 if(identifierType === "msisdn" || identifierType === "imei"){
    context.setVariable("isValidIdentifier", "true");
    context.setVariable("msisdn", "");
    if(identifierType === "imei"){
        context.setVariable("oldImei", identifierValue);
    }
    
 }else{
    context.setVariable("isValidIdentifier", "false");
    context.setVariable("errorMessage.status", "400");
    context.setVariable("errorMessage.code", "400");
    context.setVariable("errorMessage.message", "identifierType is invalid. The allowed values are msisdn or imei");
 }
 
 
 if(identifierType === "msisdn"){
    context.setVariable("Auditor.id", identifierValue); 
    context.setVariable("Auditor.idType", "msisdn"); 
 }