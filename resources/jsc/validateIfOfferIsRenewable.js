var offeringId = context.getVariable('offeringId');
var isOfferingIdRenewable = "false";

if(offeringId !== undefined && offeringId !== null && offeringId !== ""){
    offeringId = offeringId.toString();
    if(offeringId[1] == "6"){
        isOfferingIdRenewable = 'true'
    }
}

context.setVariable("isOfferingIdRenewable", isOfferingIdRenewable);
