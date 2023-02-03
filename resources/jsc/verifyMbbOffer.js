 
var offeringId = context.getVariable("offeringId");

// Main 
try{
    validateOfferingId(offeringId);
}catch(err){
    context.setVariable("isMbbOffer", "error");
}

function validateOfferingId(offeringId) {
    // Validate mobility
    offeringId = offeringId.toString();
    if(offeringId[1] === "6" || offeringId[1] === "7" || offeringId[1] === "8"){
        context.setVariable("isMbbOffer", "true");
    }else{
        context.setVariable("isMbbOffer", "false");
    }
}