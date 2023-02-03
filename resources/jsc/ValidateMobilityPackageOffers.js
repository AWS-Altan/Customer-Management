 var offeringId = context.getVariable("responsePrimaryOffering.offeringId");

verifyOfferingId(offeringId);


function verifyOfferingId(offeringId) {
    if(typeof(offeringId) !== 'undefined' && offeringId !== null && offeringId !== ""){
        offeringId = offeringId.toString();
        if(offeringId[1] == "8" || offeringId[1] == "7" || offeringId[1] == "6"){
        	context.setVariable("isMobilityOffer", "true");
        }else{
    	    context.setVariable("isMobilityOffer", "false");
        }
    }
}