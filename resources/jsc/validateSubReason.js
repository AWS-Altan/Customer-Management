var subReason = context.getVariable("subReason");
subReason = (typeof(subReason) !== undefined && subReason !== null && subReason !== "") ? subReason.toString() : "";

main();

function main(){
    
    if(subReason !== ""){
        if(!isSubReasonCodeValid(subReason)){
            context.setVariable("isSubReasonValid", "false");
            context.setVariable("statusErrorCode", "400");
            context.setVariable("statusErrorMessage", "The subReason is not valid, the value must be (10, 11, 12, 13)");
        }
    }
    
}


function isSubReasonCodeValid(subReason){
    return (subReason === "10" || subReason === "11" || subReason === "12" || subReason === "13");
}


