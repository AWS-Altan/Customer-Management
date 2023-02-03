var newOfferingId = context.getVariable("offeringId")
var currentOfferingId = context.getVariable("responsePrimaryOffering.offeringId");
var operacion = context.getVariable("Auditor.operation");
var serviceabilityVersion = context.getVariable("serviceabilityVersion");
var isServiceabilityVersion3=serviceabilityVersion === '3'?'true':'false';
context.setVariable('isServiceabilityVersion3', isServiceabilityVersion3);

// Main 
try{
    validateOfferingId(newOfferingId);
    isLandLine(newOfferingId);
    
}catch(err){
    context.setVariable("verifyServiceability", "error");
}

// Get speed from an offering id
function getSpeed(offeringId){
    var speed = 0;
    if(offeringId !== undefined && offeringId !== null && offeringId !== ""){
        offeringId = offeringId.toString();
        speed = parseInt(offeringId.substr(3,2));
    }
    return speed;
}

//Check for LandLines offerings
function isLandLine(newOfferingId){
    var landLine = "false";
    if(newOfferingId !== undefined && newOfferingId !== null && newOfferingId !== ""){
        newOfferingId = newOfferingId.toString();
        if(newOfferingId[2] == "5" || newOfferingId[2] == "6"){
            landLine = "true";
        }
    }
    context.setVariable("isFixedTelephony", landLine);
    return landLine;
}

function isSatelliteHBBLine(newOfferingId){
    var satelliteHBBLine = "false";
    if(newOfferingId !== undefined && newOfferingId !== null && newOfferingId !== ""){
        newOfferingId = newOfferingId.toString();
        if(newOfferingId[1] == "0" || newOfferingId[1] == "1" || newOfferingId[1] == "2"){
            if(newOfferingId.substr(3,2) == "02"){
                print ("***ES HBB Satelital");
                satelliteHBBLine = "true";
            }
        }
    }
    context.setVariable("isSatelliteHBBLine", satelliteHBBLine);
    if ( operacion.toUpperCase().includes("CAMBIO DE OFERTA") && satelliteHBBLine=="true" && isServiceabilityVersion3=='true'){
        context.setVariable("excludeEBLKValidation", "true");
    }
    return satelliteHBBLine;
}

function validateOfferingId(offeringId) {
    // Get Speeds
    var currentSpeed = getSpeed(currentOfferingId);
    var newSpeed = getSpeed(newOfferingId);

    // Validate Speed
    if(newSpeed === 0){
        context.setVariable("verifyServiceability", "error");
        return;
    }else if(newSpeed == 99 || newSpeed <= currentSpeed){
        print("entra a validacion de velocidad de nueva oferta es menor o igual");
    	context.setVariable("verifyServiceability", "false");
    }else{
        // Validate HBB or mobility
        print('Entra a HBB Y MOBILITY');
        if(newOfferingId[1] == "0" || newOfferingId[1] == "1" || newOfferingId[1] == "2"){
            context.setVariable("verifyServiceability", "true");
            isSatelliteHBBLine(newOfferingId);
        }else if(newOfferingId[1] == "3" || newOfferingId[1] == "4" || newOfferingId[1] == "5"){
            context.setVariable("verifyServiceability", "false");
        }else{
            context.setVariable("verifyServiceability", "false");
            context.setVariable("vozMobility", "true");
        }
    }
}