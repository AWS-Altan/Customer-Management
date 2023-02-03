var devApp = context.getVariable("apigee.developer.app.name");


main();

function main(){
    validateDevApp(devApp);
}


function validateDevApp(devApp){
    var isDevAppValid = "false";
    if(devApp.includes("sva")){
        isDevAppValid = "true";
    }
    
    context.setVariable("isDevAppValid", isDevAppValid);
}