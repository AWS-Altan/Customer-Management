var newOfferingId = context.getVariable("offeringId");
var currentOfferingId = context.getVariable("responsePrimaryOffering.offeringId");
var operacion = context.getVariable("Auditor.operation");
var serviceabilityVersion = context.getVariable("serviceabilityVersion");
var isServiceabilityVersion3=serviceabilityVersion === '3'?'true':'false';

// Main 
dataOffering = validateOfferingId(newOfferingId, operacion);
isFixedTelephony = isLandLine(newOfferingId);
var dataOfferingAnalizeArr = dataOffering.split('|');
print('verifyServiceability: '+dataOfferingAnalizeArr[0]);
print('isHbbPlusBeta: '+dataOfferingAnalizeArr[1]);
print("isSatelliteHBBLine: "+dataOfferingAnalizeArr[2]);
print("excludeEBLKValidation: "+dataOfferingAnalizeArr[3]);
print('isFixedTelephony: '+isFixedTelephony);

context.setVariable("verifyServiceability", dataOfferingAnalizeArr[0]);
context.setVariable('isHbbPlusBeta', dataOfferingAnalizeArr[1]);
context.setVariable("isSatelliteHBBLine", dataOfferingAnalizeArr[2]);
context.setVariable("excludeEBLKValidation", dataOfferingAnalizeArr[3]);
context.setVariable("isFixedTelephony", isFixedTelephony);
context.setVariable('isServiceabilityVersion3', isServiceabilityVersion3);

// Get speed from an offering id
function getSpeed(offeringId){
	print('***Dentro de getSpeed**');
    var speed = 0;
    if(offeringId !== undefined && offeringId !== null && offeringId !== ""){
        offeringId = offeringId.toString();
        speed = parseInt(offeringId.substr(3,2));
        print('Velocidad de la oferta: '+offeringId.substr(3,2));
    }
    return speed;
}

//Check for LandLines offerings
function isLandLine(newOfferingId){
	print('***Dentro de isLandLine**');
    var landLine = "false";
    if(newOfferingId !== undefined && newOfferingId !== null && newOfferingId !== ""){
        newOfferingId = newOfferingId.toString();
        if(newOfferingId[2] == "5" || newOfferingId[2] == "6"){
            landLine = "true";
        }
    }
    return landLine;
}

function isSatelliteHBBLine(newOfferingId, operacion){
    print('***Dentro de HBB satelital**');
    var satelliteHBBLine = "false";
    var excludeEBLKValidation = "false";
    if(newOfferingId !== undefined && newOfferingId !== null && newOfferingId !== ""){
        newOfferingId = newOfferingId.toString();
        if(newOfferingId[1] == "0" || newOfferingId[1] == "1" || newOfferingId[1] == "2"){
            if(newOfferingId.substr(3,2) == "02"){
                print ("***ES HBB Satelital");
                satelliteHBBLine = "true";
            }
        }
    }
    if ( operacion.toUpperCase().includes("CAMBIO DE OFERTA") && satelliteHBBLine=="true" && isServiceabilityVersion3=='true'){
        excludeEBLKValidation = "true";   
    }
    return satelliteHBBLine+'|'+excludeEBLKValidation;
}

function validateOfferingIdHbbPlusBeta(newOfferingId, operacion, verifyServiceability) {
    print("***En validacion HBB + Beta***");
    print("***Valores del digitos 6 y 7: "+newOfferingId.substr(5,2)+"***");
    print("***Valor de la operacion: "+operacion.toUpperCase()+"***");
    
    var isHbbPlusBeta = 'false';
    if(parseInt(newOfferingId.substr(5,2)) === 57){
        isHbbPlusBeta = 'true';
        if(operacion.toUpperCase().includes("CAMBIO DE OFERTA")){
            verifyServiceability = 'false';
        }
    }
    return verifyServiceability+'|'+isHbbPlusBeta;
}

function validateOfferingId(offeringId, operacion) {
	print('***Dentro de validateOfferingId**')
	print("***Valor de la operacion: "+operacion+"***");
    var verifyServiceabilityResponse = 'error';
    var satelliteHBBLine = 'false';
    var vozMobility = 'false';
    // Get Speeds
    var currentSpeed = getSpeed(currentOfferingId);
    var newSpeed = getSpeed(newOfferingId);
    print ('newSpeed::'+ newSpeed);
	var returnData = '';
    // Validate Speed
    if(newSpeed === 0){
        verifyServiceabilityResponse = 'error';
        returnData = verifyServiceabilityResponse+'|false|false|false';
    }else if(newSpeed == 99 || newSpeed <= currentSpeed){
        print("Entra a validacion de velocidad de nueva oferta es menor o igual");
        if(newOfferingId[1] == '0' || newOfferingId[1] == '1' || newOfferingId[1] == '2'){
            hbbPlusBetaData = validateOfferingIdHbbPlusBeta(newOfferingId, operacion, 'false');
            print('hbbPlusBetaData::' + hbbPlusBetaData);
            satelliteHBBLine = isSatelliteHBBLine(newOfferingId, operacion);
            var hbbPlusBetaDataArr = hbbPlusBetaData.split('|');
            print ("hbbPlusBetaDataArr::"+ hbbPlusBetaDataArr);
            var satelliteHBBLineArr = satelliteHBBLine.split('|');
            verifyServiceabilityResponse = hbbPlusBetaDataArr[0];
			returnData = verifyServiceabilityResponse+'|'+hbbPlusBetaDataArr[1]+'|'+satelliteHBBLineArr[0]+'|'+satelliteHBBLineArr[1];
        }else{
            verifyServiceabilityResponse = 'false';
            returnData = verifyServiceabilityResponse+'|false|false|false';
        }
    }else{
        // Validate HBB or mobility
        print('***Entra a HBB Y MOBILITY***');
        if(newOfferingId[1] == '0' || newOfferingId[1] == '1' || newOfferingId[1] == '2'){
            if ( newOfferingId.toString().substring(3,5) == "25" || newOfferingId.toString().substring(3,5) == "26"
            || newOfferingId.toString().substring(3,5) == "27" || newOfferingId.toString().substring(3,5) == "28" 
            || newOfferingId.toString().substring(3,5) == "29"){
                print('substring: '+newOfferingId.toString().substring(3,5)+' no es HBB');
                verifyServiceabilityResponse = 'false';
                returnData = verifyServiceabilityResponse+'|false|false|false';
            }else{
                hbbPlusBetaData = validateOfferingIdHbbPlusBeta(newOfferingId, operacion, 'true');
                print('hbbPlusBetaData::' + hbbPlusBetaData);
                satelliteHBBLine = isSatelliteHBBLine(newOfferingId, operacion);
                var hbbPlusBetaDataArr = hbbPlusBetaData.split('|');
                print ("hbbPlusBetaDataArr::"+ hbbPlusBetaDataArr);
                var satelliteHBBLineArr = satelliteHBBLine.split('|');
                verifyServiceabilityResponse = hbbPlusBetaDataArr[0];
                returnData = verifyServiceabilityResponse+'|'+hbbPlusBetaDataArr[1]+'|'+satelliteHBBLineArr[0]+'|'+satelliteHBBLineArr[1];
            }
        }else if(newOfferingId[1] == '3' || newOfferingId[1] == '4' || newOfferingId[1] == '5'){
            verifyServiceabilityResponse = 'false';
            returnData = verifyServiceabilityResponse+'|false|false|false';
        }else{
            context.setVariable("vozMobility", "true");
            verifyServiceabilityResponse = 'false';
            returnData = verifyServiceabilityResponse+'|false|false|false';
        }
    }
    print("returnData: "+returnData);
    return returnData;
}