var subStatus = context.getVariable("responseQuerySubStatus.subStatus");
var isValidStatus = "false";

if(subStatus === 2 || subStatus === 4 || subStatus === 3){
    isValidStatus = "true";
}

context.setVariable("isValidStatus", isValidStatus);

