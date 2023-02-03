var offerId = "";
var offeringsId = (typeof(context.getVariable("offerings")) !== 'undefined') ? JSON.parse(context.getVariable("offerings")) : [];

if(typeof(offeringsId) !== 'undefined' && offeringsId !== null && offeringsId !== ""){
    for(i = 0; i < offeringsId.length; i++){
      offerId = offeringsId[i].toString(); 

      if(offerId.charAt(3) === "3" && offerId.charAt(4) === "1"){
          context.setVariable("verifPCE", "true");
      }
    }
}
