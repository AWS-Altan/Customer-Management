var offerings = JSON.parse(context.getVariable("SuppOfferings.suppOff"));
var purchase = context.getVariable("SuppOfferings.purchaseSeq");

if(typeof(offerings) !== 'undefined' && offerings !== null && offerings !== "" && Array.isArray(offerings)){
    var supplementaryPurchase = [];
    var i;
    for(i = 0; i < offerings.length; i++){
        purchase = ( offerings[i].OfferingId.PurchaseSeq !== 'undefined' && offerings[i].OfferingId.PurchaseSeq !== null && offerings[i].OfferingId.PurchaseSeq !== "" ) ? offerings[i].OfferingId.PurchaseSeq.toString() : '';
        supplementaryPurchase.push(purchase);
    }
    context.setVariable("supplementaryPurchase", JSON.stringify(supplementaryPurchase));
    
    var newres = JSON.parse(context.getVariable("supplementaryPurchase"));
    max = 0;
    for(var i=0;i<newres.length;i++){
        if(max < newres[i]){
            max = newres[i];
        }
    }
    context.setVariable("purchaseSeq", max);
    
    var supplementaries = {};
    var Offerings = [];
    for(i = 0; i < offerings.length; i++){
        var supplementaries = {};
        supplementaries.offeringId = ( offerings[i].OfferingId.OfferingId !== 'undefined' && offerings[i].OfferingId.OfferingId !== null && offerings[i].OfferingId.OfferingId !== "" ) ? offerings[i].OfferingId.OfferingId.toString() : '';
        supplementaries.purchase = ( offerings[i].OfferingId.PurchaseSeq !== 'undefined' && offerings[i].OfferingId.PurchaseSeq !== null && offerings[i].OfferingId.PurchaseSeq !== "" ) ? offerings[i].OfferingId.PurchaseSeq.toString() : '';
        Offerings.push(supplementaries);
    }
        context.setVariable("supplementaryOffering", JSON.stringify(Offerings.find(supplementary)));
        
        var supplementaryOffering = Offerings.find(supplementary);
        context.setVariable("suppOffering", supplementaryOffering.offeringId);
}
function supplementary(offering) { 
            return offering.purchase === max;
        }

