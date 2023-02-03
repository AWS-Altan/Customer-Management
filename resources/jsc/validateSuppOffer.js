 var suppOfferName = context.getVariable("offeringName");
 var beId = context.getVariable("request.header.PartnerId");
 print("PartnerId: " + beId);
 suppOfferName = (typeof(suppOfferName) !== undefined && suppOfferName !== null && suppOfferName !== "") ? suppOfferName.toLowerCase() : "";
 
 if(suppOfferName !== ""){
    if(suppOfferName.includes("promo") && beId !== "103"){
        context.setVariable("errorMessage.code", "400");
        context.setVariable("errorMessage.message", "The purchase cannot be made because the supplementary offer is promotional");
        context.setVariable("errorMessage.status", "400");
        context.setVariable("isSuppPromo", "true");
    }else{
        context.setVariable("isSuppPromo", "false");
    }
 }else{
     context.setVariable("isSuppPromo", "false");
 }