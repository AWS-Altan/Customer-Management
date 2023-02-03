var latitude = context.getVariable("latitude");
var longitude = context.getVariable("longitude");


if(typeof(latitude) !== 'undefined' && latitude !== null && typeof(longitude) !== 'undefined' && longitude !== null){
    context.setVariable("coordinates", latitude+","+longitude);
}else{
    context.setVariable("coordinates","");
}
