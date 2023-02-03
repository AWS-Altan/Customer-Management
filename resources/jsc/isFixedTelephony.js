 var offeringId = context.getVariable("offeringId");

verifyOfferingId(offeringId);


function verifyOfferingId(offeringId) {
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