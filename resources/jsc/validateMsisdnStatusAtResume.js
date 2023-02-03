var code = context.getVariable("responseQuerySubStatus.returnCode");
code = (typeof(code) !== undefined && code !== null && code !==  "") ? code.toString() : "";
var description = context.getVariable("responseQuerySubStatus.returnMsg");
description = (typeof(description) !== undefined && description !== null && description !==  "") ? description.toString() : "";
var subscriberStatus = context.getVariable("responseQuerySubStatus.subStatus");
subscriberStatus = (typeof(subscriberStatus) !== undefined && subscriberStatus !== null && subscriberStatus !==  "") ? subscriberStatus.toString() : "";

var returnCode = "";
var returnMsg = "";

if(code !== ""){
    if(code === "1211000305"){
        returnCode = "1211000305";
        returnMsg = "The subscriber does not exist.@44119195";
    }else if(code ==="0000"){
        if(subscriberStatus === "1"){
            returnCode = "1211000163";
            returnMsg = "Invalid operation. The Subscriber status is Idle.@44119195";
        }else if(subscriberStatus === "2"){
            returnCode = "1211000163";
            returnMsg = "Invalid operation. The Subscriber status is Active.@44119195";
        }else if(subscriberStatus === "3" ){
            returnCode = "1211000521";
            returnMsg = "Unsupported operation type.@817469325";
        }else if(subscriberStatus === "5" || subscriberStatus === "B07"){
            returnCode = "1211000163";
            returnMsg = "Invalid operation. The Subscriber status is Predeactived.@44119195";
        }else{
            returnCode = "0000";
            returnMsg = "Success"
        }
        
    }else{
        returnCode = code.toString();
        returnMsg = description.toString();
    }
    
    context.setVariable("returnCode", returnCode);
    context.setVariable("returnMsg", returnMsg);
}
