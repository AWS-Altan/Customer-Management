var offeringIdPromo = context.getVariable('responseCatalogPromotions.offerIdPromotionPorta');
var offeringIdPromoArr = offeringIdPromo.split("|");
var offerings = JSON.parse(context.getVariable("SuppOfferings.suppOff"));
var hasSuppOffersToDelete = "false";
context.setVariable('offeringIdPromo', offeringIdPromo);

if(typeof(offerings) !== 'undefined' && offerings !== null && offerings !== "" ){
	if(offerings.length>0){
    	var supplementaries = {};
        var supplementaryOfferings = [];
        var i;
        for(i = 0; i < offerings.length; i++){
            	var supplementaries = {};
              	supplementaries.offeringId = ( offerings[i].OfferingId.OfferingId !== 'undefined' && offerings[i].OfferingId.OfferingId !== null && offerings[i].OfferingId.OfferingId !== "" ) ? offerings[i].OfferingId.OfferingId.toString() : '';
              	supplementaries.purchaseSeq = ( offerings[i].OfferingId.PurchaseSeq !== 'undefined' && offerings[i].OfferingId.PurchaseSeq !== null && offerings[i].OfferingId.PurchaseSeq !== "" ) ? offerings[i].OfferingId.PurchaseSeq.toString() : '';
              	supplementaries.offeringName = offerings[i].OfferingName;
              	supplementaries.effectiveDate = offerings[i].EffectiveDate;
	            supplementaryOfferings.push(supplementaries);
        }
        //context.setVariable("supplementaryOfferings", JSON.stringify(supplementaryOfferings));    
    }else{
          	var supplementaries = {};
          	supplementaries.offeringId = offerings.OfferingId.OfferingId.toString();
          	supplementaries.offeringName = offerings.OfferingName;
          	supplementaries.purchaseSeq = offerings.OfferingId.PurchaseSeq.toString();
          	supplementaries.effectiveDate = offerings.EffectiveDate;
          	var supplementaryOfferings = [];
          	supplementaryOfferings.push(supplementaries);
          	//context.setVariable("supplementaryOfferings", JSON.stringify(supplementaryOfferings));
    }	   
}else{
	 var supplementaryOfferings = []
}

if(supplementaryOfferings.length>0){
	if(typeof(offeringIdPromoArr) !== 'undefined' && offeringIdPromoArr !== null && offeringIdPromoArr !== "" ){
    	if(offeringIdPromoArr.length>0){
  			for(y = 0; y < offeringIdPromoArr.length; y++){
        		for(z = 0; z < supplementaryOfferings.length; z++){
                	if(offeringIdPromoArr[y]==supplementaryOfferings[z].offeringId){
                    	supplementaryOfferings.splice(z, 1);
                    }
                
                }	
    		}
  		}
	}
	hasSuppOffersToDelete = "true";
}
context.setVariable("supplementaryOfferings", JSON.stringify(supplementaryOfferings));
context.setVariable("hasSuppOffersToDelete", hasSuppOffersToDelete);
