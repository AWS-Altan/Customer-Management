var offeringId = context.getVariable("offeringId");

if(offeringId !== 'undefined' && offeringId !== null && offeringId !== "" ){
    
    offeringId = offeringId.toString();
        var payload = {};
        if(offeringId){
            payload.offeringId = offeringId.toString();
            context.setVariable("date.data", JSON.stringify(payload));
        }
}
