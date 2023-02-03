 var coordinates = context.getVariable("coordinates");

print("Coodinates:"+coordinates+" ||| ");

extractLatLong(coordinates);


function extractLatLong(coordinates) {
    
    var coordinatesArr = coordinates.split(",");
    var latitude = "";
    var longitude = "";
    print("coordinatesArr[0]:"+coordinatesArr[0].trim()+" ||| ");
    print("coordinatesArr[1]:"+coordinatesArr[1].trim()+" ||| ");
    if(
        (typeof(coordinatesArr[0]) !== 'undefined' && coordinatesArr[0] !== null && coordinatesArr[0] !== "") 
        && 
        (typeof(coordinatesArr[1]) !== 'undefined' && coordinatesArr[1] !== null && coordinatesArr[1] !== "")
    ){
        latitude  = coordinatesArr[0].trim();
        longitude = coordinatesArr[1].trim();
    }else{
        latitude  = "false";
        longitude = "false";
        
    }
    print("latitude:"+latitude+" ||| ");
    print("longitude:"+longitude+" ||| ");
    
    context.setVariable("latitude", latitude);
    context.setVariable("longitude", longitude);
}