var offeringId = context.getVariable("offeringId")
var serviceabilityVersion = context.getVariable("serviceabilityVersion");
var isServiceabilityVersion3=serviceabilityVersion === '3'?'true':'false';
// Main 
dataOffering = validateOfferingId(offeringId);
var dataOfferingAnalizeArr = dataOffering.split('|');
print('verifyServiceability: '+dataOfferingAnalizeArr[0]);
print("isHBBOffer: "+dataOfferingAnalizeArr[1]);
print('isHbbPlusBeta: '+dataOfferingAnalizeArr[2]);
print("isSatelliteHBBLine: "+dataOfferingAnalizeArr[3]);

context.setVariable("verifyServiceability", dataOfferingAnalizeArr[0]);
context.setVariable('isHBBOffer', dataOfferingAnalizeArr[1]);
context.setVariable('isHbbPlusBeta', dataOfferingAnalizeArr[2]);
context.setVariable("isSatelliteHBBLine", dataOfferingAnalizeArr[3]);
context.setVariable('isServiceabilityVersion3', isServiceabilityVersion3);


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
    return satelliteHBBLine;
}

function validateOfferingIdHbbPlusBeta(offeringId) {
    var isHbbPlusBeta = 'false';
    if(parseInt(offeringId.substr(5,2)) == 57){
        isHbbPlusBeta = 'true';
    }
    return isHbbPlusBeta;
}

function validateOfferingId(offeringId) {
    // Get Speeds
    var speed = getSpeed(offeringId);
    var isHBBOffer = 'false';
    var verifyServiceability = '';
    var returnData = '';
    var isHbbPlusBeta = 'false';
    var isSatelliteHBBLineFlag = 'false';
    
    if(offeringId[1] == "0" || offeringId[1] == "1" || offeringId[1] == "2"){
        //context.setVariable("isHBBOffer", "true");
        isHBBOffer = 'true';
    }
    // Validate Speed
    if(speed === 0){
        verifyServiceability = 'error';
    }else if(speed == 99){
        verifyServiceability = 'false';
    }else{
        // Validate HBB or mobility
        if(offeringId[1] == "0" || offeringId[1] == "1" || offeringId[1] == "2"){
            verifyServiceability = 'true';
            isHbbPlusBeta = validateOfferingIdHbbPlusBeta(offeringId);
            isSatelliteHBBLineFlag = isSatelliteHBBLine(offeringId);
        }else if(offeringId[1] == "3" || offeringId[1] == "4" || offeringId[1] == "5"){
            verifyServiceability = 'false';
        }else{
            verifyServiceability = 'false';
        }
    }
    returnData = verifyServiceability+'|'+isHBBOffer+'|'+isHbbPlusBeta+'|'+isSatelliteHBBLineFlag;
    return returnData;
}