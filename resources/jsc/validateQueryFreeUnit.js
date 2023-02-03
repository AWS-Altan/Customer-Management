var totalAmt = context.getVariable("rspQFU.totalAmt");
var freeUnits = context.getVariable("rspQFU.freeUnits");

print("FreeUnits: " + freeUnits);


if(typeof(freeUnits)!== 'undefined' && freeUnits !== null && freeUnits !== "" && Array.isArray(freeUnits) ){
    context.setVariable("activate", "false");
}else{
    context.setVariable("activate", "true");
}

/*if(totalAmt !== null && totalAmt !== "" && totalAmt !== undefined && totalAmt !== 0){
    	context.setVariable("activate", "false");
   }else{
    	context.setVariable("activate", "true");
   }*/