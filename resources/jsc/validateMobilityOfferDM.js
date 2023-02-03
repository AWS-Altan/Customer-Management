var offeringId = context.getVariable("offeringId");

verifyOfferingId(offeringId);


function verifyOfferingId(offeringId) {
    if(typeof(offeringId) !== 'undefined' && offeringId !== null && offeringId !== ""){
        offeringId = offeringId.toString();
        if(offeringId[1] == "6" || offeringId[1] == "7" || offeringId[1] == "8"){
        	context.setVariable("isMobility", "true");
        }else{
    	    context.setVariable("isMobility", "false");
        }
    }else{
        context.setVariable("isMobility", "false");
    }
} 