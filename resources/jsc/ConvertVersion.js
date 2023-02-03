var subStatus = context.getVariable("responseQuerySubStatus.subStatus");
var totalAmt = context.getVariable("responseQueryFreeUnit.totalAmt");
var unusedAmt = context.getVariable("responseQueryFreeUnit.unusedAmt");

totalAmt = totalAmt / 1048576;
unusedAmt = unusedAmt / 1048576;


if(subStatus == 1){
    subStatus ="Idle";
}
else if(subStatus == 2){
    subStatus ="Active"
}
else if(subStatus == 3){
    subStatus = "Baring (B1W)";
}
else if(subStatus == 4){
    subStatus = "Suspend (B2W)";
}
else if(subStatus == 5){
    subStatus = "Predeactivate";
}
else if(subStatus.equals("B07")){
    subStatus = "Status B07";
}
else{
    subStatus = "Deactivate";
}

context.setVariable("responseQuerySubStatus.subStatus", subStatus);
context.setVariable("responseQueryFreeUnit.totalAmt", totalAmt);
context.setVariable("responseQueryFreeUnit.unusedAmt", unusedAmt);