var beId = context.getVariable("be");
beId = (typeof(beId) !== undefined && beId !== null && beId !== "") ? beId.toString() : "";
var beIdList = context.getVariable("beIdList");
beIdList = (typeof(beIdList) !== undefined && beIdList !== null && beIdList !== "") ? beIdList.toString() : "";
var isBeIdValid = "false";

if(beId !== ""){
    
    if(beIdList.includes(beId)){
        isBeIdValid = "true";
    }
}

context.setVariable("isBeIdValid", isBeIdValid);