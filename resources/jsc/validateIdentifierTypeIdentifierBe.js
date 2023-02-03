 var identifierValue = context.getVariable("identifierValue");
 var identifierType = context.getVariable("identifierType");
 
 identifierValue = ((typeof(identifierValue) !== undefined) && (identifierValue !== null) && (identifierValue !== "")) ? identifierValue.toString() : "";
 
 identifierType = ((typeof(identifierType) !== undefined) && (identifierType !== null) && (identifierType !== "")) ? identifierType.toString() : "";
 
 if(identifierType !== ""){
     identifierType = identifierType.toLowerCase();
     if(identifierType === "msisdn"){
         context.setVariable(identifierType, identifierValue);
         context.setVariable("identifierType", identifierType);
         context.setVariable("isIdentifierValid", "true");
     }else{
        context.setVariable("isIdentifierValid", "false");
        context.setVariable("errorMessage.status", "400");
        context.setVariable("errorMessage.code", "400");
        context.setVariable("errorMessage.message", "identifierType is invalid. The value must be (msisdn)");
     }
 }