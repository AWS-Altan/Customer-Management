var devApp = context.getVariable("apigee.developer.app.name");
//devApp = "aws_batch";
var reason = context.getVariable("reason");

devApp = (typeof(devApp) !== 'undefined' && devApp !== null && devApp !== "") ? devApp.toString() : "";
reason = (typeof(reason) !== 'undefined' && reason !== null && reason !== "") ? reason.toString() : "";

main();

function main(){
    isValidOperation();
}


function isValidOperation(){
    if(reason === "2" && devApp.equals("aws_batch")){
        context.setVariable("getReasonCode", "false");
    }else{
        context.setVariable("getReasonCode", "true");
    }
}

 