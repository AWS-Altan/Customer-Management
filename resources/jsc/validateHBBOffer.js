 var offeringId = context.getVariable("responsePrimaryOffering.offeringId");

verifyOfferingId(offeringId);
verifyOfferingIdFixed(offeringId);
verifyOfferingIdMBB(offeringId);


function verifyOfferingId(offeringId) {
    if(typeof(offeringId) !== 'undefined' && offeringId !== null && offeringId !== ""){
        offeringId = offeringId.toString();
        if(offeringId[1] == "0" || offeringId[1] == "1" || offeringId[1] == "2"){
        	context.setVariable("isHBBOffer", "true");
        }else{
    	    context.setVariable("isHBBOffer", "false");
        }
    }
}

function verifyOfferingIdMBB(offeringId) {
    if(typeof(offeringId) !== 'undefined' && offeringId !== null && offeringId !== ""){
        offeringId = offeringId.toString();
        if(offeringId[1] == "3" || offeringId[1] == "4" || offeringId[1] == "5"){
        	context.setVariable("isMIFIOffer", "true");
        }else{
    	    context.setVariable("isMIFIOffer", "false");
        }
        
        if(offeringId[1] == "6" || offeringId[1] == "7" || offeringId[1] == "8"){
        	context.setVariable("isMBBOffer", "true");
        }else{
    	    context.setVariable("isMBBOffer", "false");
        }
    }
}

function verifyOfferingIdFixed(offeringId) {
    var isFixedTel = "false";
    if(typeof(offeringId) !== 'undefined' && offeringId !== null && offeringId !== ""){
        offeringId = offeringId.toString();
        if(offeringId[1] == "0" || offeringId[1] == "1" || offeringId[1] == "2"){
        	if(offeringId[2] == "5" || offeringId[2] == "6"){
        	    isFixedTel = "true"
        	}
        }
    }
    
    context.setVariable("isFixedTel", isFixedTel);
}