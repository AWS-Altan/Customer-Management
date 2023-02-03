var offeringId = context.getVariable("responsePrimaryOffering.offeringId");
var isExpireEffectiveOffer = "false";
verifyOfferingId(offeringId);


function verifyOfferingId(offeringId) {
    if(typeof(offeringId) !== 'undefined' && offeringId !== null && offeringId !== ""){
        offeringId = offeringId.toString();
        if(offeringId[2] == "1" || offeringId[2] == "4" || offeringId[2] == "6" || offeringId[2] == "8"){
            isExpireEffectiveOffer = "true";
        }
        print("isExpireEffectiveOffer: "+isExpireEffectiveOffer);
    }
    context.setVariable("isExpireEffectiveOffer", isExpireEffectiveOffer);
}