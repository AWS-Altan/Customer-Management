var startDate = context.getVariable("startEffectiveDate")
var expireDate = context.getVariable("expireEffectiveDate")
var schedule = context.getVariable("scheduleDate");
var offeringId = context.getVariable("offeringId")

if(((startDate == null || startDate == "") && (expireDate == null || expireDate == "")) && (schedule == null || schedule == "")){
    context.setVariable("fobidFiff", "false");
}else{
    context.setVariable("fobidFiff", "true");
}

if(offeringId === null || offeringId === ""){
    context.setVariable("fobidFiff", "false");
}else{
    offeringId = offeringId.toString();
    if(offeringId.charAt(2) == "1" || offeringId.charAt(2) == "4" || offeringId.charAt(2) == "6" || offeringId.charAt(2) == "8"){
        context.setVariable("fobidFiff", "true");
    }else{
        context.setVariable("fobidFiff", "false");
    }
}