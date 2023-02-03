var offeringId = context.getVariable("offeringId");
var orderId = context.getVariable("orderId");

 
if(offeringId !== null && offeringId !== "undefined" && offeringId !== ""){
    if(orderId !== null && typeof(orderId) !== undefined && orderId !== ""){
        context.setVariable("validator.error", "true");
        context.setVariable("validator.code", "400");
        context.setVariable("validator.message", "You can only send one value at a time (offeringId or orderId)");
    }else{
        validateSpeedDownOffering(offeringId);
    }
    
}else{
    if(orderId !== null && orderId !== "undefined" && orderId !== "" && isNaN(orderId) === false){
        context.setVariable("validateOffersByOrderId", "true");
        context.setVariable("validator.error", "false");
    }else{
        context.setVariable("validator.error", "true");
        context.setVariable("validator.code", "400");
        context.setVariable("validator.message", "The orderId is required.");
    }
    /*context.setVariable("validator.error", "false");
    context.setVariable("validator.code", "400");
    context.setVariable("validator.message", "The offeringId is required.");*/
}


function validateSpeedDownOffering(offeringId){
    if( offeringId[2] != '2'){
        context.setVariable("validator.code", "400");
        context.setVariable("validator.message", "The offeringId is not compatible with this feature.");
        context.setVariable("validator.error", "true");
    }else{
        context.setVariable("validator.error", "false");
    }
}