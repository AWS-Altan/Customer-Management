var offers = context.getVariable("offeringId");
var devApp = context.getVariable("apigee.developer.app.name");
var offerWithSva = "false";

main();

function main(){
    if(validateOfferSva(offeringId)){
        offerWithSva = "true";
    }
    
    context.setVariable("offerWithSva", offerWithSva);
    validateDevApp(devApp);
}


function validateOfferSva(offeringId){
    offeringId = offeringId.toString();
    var hasSva = "false";
    
    if(offeringId[5] === "6" && offeringId[6] === "7"){
        hasSva = "true";
    }
    
    return hasSva;
}

function validateDevApp(devApp){
    var origin;
    if(devApp.includes("sva")){
        origin = "2";
    }else{
        origin = "1";
    }
    
    context.setVariable("origin", origin);
}
