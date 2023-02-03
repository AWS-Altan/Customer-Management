var offeringId = context.getVariable("offeringId")
var serviceabilityVersion = context.getVariable("serviceabilityVersion");
var isServiceabilityVersion3=serviceabilityVersion === '3'?'true':'false';
context.setVariable('isServiceabilityVersion3', isServiceabilityVersion3);

// Main 
try{
    validateOfferingId(offeringId);
}catch(err){
    context.setVariable("verifyServiceability", "error");
}

// Get speed from an offering id
function getSpeed(offeringId){
    var speed = 0;
    if(offeringId !== undefined && offeringId !== null && offeringId !== ""){
        offeringId = offeringId.toString();
        speed = parseInt(offeringId.substr(3,2));
        context.setVariable("offeringSpeed", speed);
    }
    return speed;
}

function isSatelliteHBBLine(offeringId){
    var satelliteHBBLine = "false";
    if(offeringId !== undefined && offeringId !== null && offeringId !== ""){
        offeringId = offeringId.toString();
        if(offeringId[1] == "0" || offeringId[1] == "1" || offeringId[1] == "2"){
            if(offeringId.substr(3,2) == "02"){
                print ("***ES HBB Satelital");
                satelliteHBBLine = "true";
            }
        }
    }
    context.setVariable("isSatelliteHBBLine", satelliteHBBLine);
    return satelliteHBBLine;
}

function validateOfferingId(offeringId) {
    // Get Speeds

    var speed = getSpeed(offeringId);
    
    if(offeringId[1] == "0" || offeringId[1] == "1" || offeringId[1] == "2"){
        context.setVariable("isHBBOffer", "true");
    }
    else{
        context.setVariable("isHBBOffer", "false");
    }

    // Validate Speed
    if(speed === 0){
        context.setVariable("verifyServiceability", "error");
        return;
    }else if(speed == 99){
    	context.setVariable("verifyServiceability", "false");
    }else{
        // Validate HBB or mobility
        if(offeringId[1] == "0" || offeringId[1] == "1" || offeringId[1] == "2"){
            context.setVariable("verifyServiceability", "true");
            isSatelliteHBBLine(offeringId);
        }else if(offeringId[1] == "3" || offeringId[1] == "4" || offeringId[1] == "5"){
            context.setVariable("verifyServiceability", "false");
        }else{
            context.setVariable("verifyServiceability", "false");
            
        }
    }
}