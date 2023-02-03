 var offeringId = context.getVariable("responsePrimaryOffering.offeringId");

verifyOfferingId(offeringId);


function verifyOfferingId(offeringId) {
    if(typeof(offeringId) !== 'undefined' && offeringId !== null && offeringId !== ""){
        offeringId = offeringId.toString();
        if(offeringId[1] == "8"){
        	context.setVariable("isMobilityOffer", "true");
        }else{
    	    context.setVariable("isMobilityOffer", "false");
        }
        
        if(offeringId[1] == "3" || offeringId[1] == "4" || offeringId[1] == "5"){
        	context.setVariable("isMifiOffer", "true");
        }else{
    	    context.setVariable("isMifiOffer", "false");
        }
        
        if(offeringId[1] == "6" || offeringId[1] == "7" || offeringId[1] == "8"){
        	context.setVariable("isMobilityOfferFull", "true");
        }else{
    	    context.setVariable("isMobilityOfferFull", "false");
        }
    }
}