var offeringsIdSuppNotPurchaseKVM = context.getVariable("offeringsIdSuppNotPurchaseKVM");
var offeringsIdSuppNotPurchaseKVMArr = offeringsIdSuppNotPurchaseKVM.split("|");
var offeringsData = JSON.parse(context.getVariable("offerings"));

var offerAnalysis = false 
if(typeof(offeringsData) !== 'undefined' && offeringsData !== null && offeringsData !== "" && Array.isArray(offeringsData)){
    for(var x=0; x<offeringsData.length; x++){
        for(var y=0; y<offeringsIdSuppNotPurchaseKVMArr.length; y++){
            if(String(offeringsData[x]) == String(offeringsIdSuppNotPurchaseKVMArr[y])){
                offerAnalysis = true
            }
        }    
    }
}
print("offerAnalysis:"+offerAnalysis);
context.setVariable("isOfferNotPurchase", offerAnalysis);

