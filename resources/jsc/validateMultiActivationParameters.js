var request = context.getVariable("request.content");

var verifyParameters = validateParameters(request);
context.setVariable("verifyParametersActivation", verifyParameters.toString());

function validateParameters(requestContent){
    if ( isValidJsonRequest(requestContent) ){
        var requestJSON = JSON.parse(requestContent.toString());
        if ( isValidSizeRequest(requestJSON) ){
            for ( var i = 0; i <requestJSON.subscribers.length; i++ ){
                if (! isValidSubscriberStructure(requestJSON.subscribers[i]) ){
                    context.setVariable("validator.code", "400");
                    context.setVariable("validator.message", "The element ["+i+"] has an invalid structure.");
                    return false;
                }
                if (! isValidMsisdn(requestJSON.subscribers[i].msisdn) ){
                    context.setVariable("validator.code", "E-001");
                    context.setVariable("validator.message", "Incorrect data pattern in msisdn at element ["+i+"].");
                    return false;
                }
                if (! isValidOfferingId(requestJSON.subscribers[i].offeringId) ){
                    context.setVariable("validator.code", "E-001");
                    context.setVariable("validator.message", "Incorrect data pattern in offeringId at element ["+i+"].");
                    return false;
                }
            }
            return true;
        }else{
            context.setVariable("validator.code", "400");
            context.setVariable("validator.message", "You can only send up to 5 msisdns.");
        }
    }else{
        context.setVariable("validator.code", "400");
        context.setVariable("validator.message", "The payload request has an invalid format.");
    }
    return false;
    
}

function isValidJsonRequest(request){
    try{
        JSON.parse(request.toString());
    }catch(e){
        return false;
    }
    return true;
}

function isValidSizeRequest(jsonObj){
    return jsonObj.subscribers.length > 0 && jsonObj.subscribers.length <= 5;
}

function isValidSubscriberStructure(jsonObj){
    return 'msisdn' in jsonObj && 'offeringId' in jsonObj;
}

function isValidMsisdn(msisdn){
    if(typeof(msisdn) !== 'undefined' && msisdn !== null && msisdn !== ""){
        var longitud = new RegExp("^[0-9]{10}$");
        return longitud.test(msisdn);
    }
    return false;
}

function isValidOfferingId(offeringId){
    if(typeof(offeringId) !== 'undefined' && offeringId !== null && offeringId !== ""){
        var longitud = new RegExp("^[0-9]{10}$");
        return longitud.test(offeringId);
        
    }
    return false;
    
}