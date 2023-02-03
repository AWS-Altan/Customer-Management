var primaryOffering = context.getVariable("responsePrimaryOffering.offeringId").toString();
var profileVersion = context.getVariable("profileVersion");
profileVersion = ((typeof(profileVersion) !== 'undefined') && (profileVersion !== null) && (profileVersion !== "")) ? profileVersion.toString() : "";


if(profileVersion === "2"){
    
    var speed = Number(primaryOffering.substr(3,2));
    if(speed === 99){
        context.setVariable("speedPrimary", "Best Effort");
    }else if(speed === 0){
        context.setVariable("speedPrimary", "Without Speed (Default Offer)");
    }else{
        context.setVariable("speedPrimary", speed + " Mbps");
    }
}