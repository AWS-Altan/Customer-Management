var formatDate = "YYYYMMDD";
var today = moment().tz("America/Mexico_City").format("YYYYMMDD");
var offeringId = context.getVariable("offeringId");
var address = context.getVariable("address");
var msisdn = context.getVariable("msisdn");
var imei = context.getVariable("imei");
var effectiveDate = context.getVariable("scheduleDate");
var offerings = JSON.parse(context.getVariable("offerings"));
var startEffectiveDate = context.getVariable("startEffectiveDate");
var expireEffectiveDate = context.getVariable("expireEffectiveDate");

if(effectiveDate !== 'undefined' && effectiveDate !== null && effectiveDate !== "" ){
    
    effectiveDate = effectiveDate.toString();
    effectiveDate = moment(effectiveDate, formatDate).format(formatDate);
    if(effectiveDate <= today){
        context.setVariable("errorCode", "400");
        context.setVariable("description", "Last date, write a correct date");
        context.setVariable("verifyDate", "false");
    }else{
        
        var payload = {};
        
        if(msisdn){
            payload.msisdn = msisdn.toString();
        }
        if(imei){
            payload.imei = imei.toString();
        }
        if(offeringId){
            payload.offeringId = offeringId.toString();
        }
        if(address){
            payload.coordinates = address.toString();
        }
        if(offerings){
            payload.offerings = offerings;
        }
        if(effectiveDate){
            payload.effectiveDate = effectiveDate.toString();
            //payload.effectiveDate = '2018-07-24 10:02:20';
        }
        if(startEffectiveDate){
            payload.startEffectiveDate = startEffectiveDate.toString();
            //payload.effectiveDate = '2018-07-24 10:02:20';
        }
        if(expireEffectiveDate){
            payload.expireEffectiveDate = expireEffectiveDate.toString();
            //payload.effectiveDate = '2018-07-24 10:02:20';
        }
        
        context.setVariable("date.data", JSON.stringify(payload));
        context.setVariable("validateScheduleDate", "true");
        context.setVariable("verifyDate", "true");
        if(effectiveDate === 'Invalid date'){
            context.setVariable("verifyScheduleDate", "false");
        }
        
    }
    
}else{
    
    context.setVariable("validateScheduleDate", "false");
    context.setVariable("verifyDate", "true");
    context.setVariable("verifyScheduleDate", "true");
    
}
