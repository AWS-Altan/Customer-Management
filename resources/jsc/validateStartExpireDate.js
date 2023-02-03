var startEffectiveDate = context.getVariable("startEffectiveDate");
var expireEffectiveDate =  context.getVariable("expireEffectiveDate");
var scheduleDate =  context.getVariable("scheduleDate");
var offeringsId = (typeof(context.getVariable("offerings")) !== 'undefined') ? JSON.parse(context.getVariable("offerings")) : [];
var i;
var formatDateBSS= "YYYYMMDD";
var today = moment().tz("America/Mexico_City").format(formatDateBSS);
var validity = context.getVariable("validity");
validity = (typeof(validity) !== 'undefined' && validity !== null && validity !== "")? validity : 31 ;

if(typeof(offeringsId) !== 'undefined' && offeringsId !== null && offeringsId !== ""){
    for(i = 0; i < offeringsId.length; i++){
        offerId = offeringsId[i].toString();
        if( (offerId.charAt(1) === "2" || offerId.charAt(1) === "5" || offerId.charAt(1) === "8") && (offerId.charAt(2) === "1" || offerId.charAt(2) === "4" || offerId.charAt(2) === "6") ){
            if(!startEffectiveDate || !expireEffectiveDate){
                context.setVariable("errorCode", "400");
                context.setVariable("description", "Incomplete parameters. Verify the configuration in the params (startEffectiveDate and expireEffectiveDate)");
                context.setVariable("verifyDate", "false");
            }else if(offeringsId.length > 1){
                context.setVariable("errorCode", "400");
                context.setVariable("description", "You can only buy an offer with start date and end date at a time");
                context.setVariable("verifyDate", "false");
                
            }
            else{
                if(isValidDate(startEffectiveDate).equals("Invalid date") || isValidDate(expireEffectiveDate).equals("Invalid date")){
                    context.setVariable("errorCode", "400");
                    context.setVariable("description", "One of the dates entered is not valid. You must send valid dates");
                    context.setVariable("verifyDate", "false");
                }else{
                    context.setVariable("hasEndDate", "true");
                    if(typeof(startEffectiveDate) !== 'undefined' && typeof(expireEffectiveDate) !== 'undefined' && startEffectiveDate !== "" && expireEffectiveDate !== "" && startEffectiveDate !== null && expireEffectiveDate !== null){
        
                        print('days range: ' + getRangeInDays(startEffectiveDate, expireEffectiveDate));
                        
                        if(getRangeInDays(startEffectiveDate, expireEffectiveDate) > validity ){
                            context.setVariable("errorCode", "400");
                            context.setVariable("description", "Invalid date range");
                            context.setVariable("verifyDate", "false");
                        }
                    }
                    
                    if(startEffectiveDate !== 'undefined' && startEffectiveDate !== null && startEffectiveDate !== "" ){
                        startEffectiveDate = startEffectiveDate.toString();
                        startEffectiveDate = moment(startEffectiveDate, formatDateBSS).format(formatDateBSS);
                        
                    
                        if(startEffectiveDate < today){
                                context.setVariable("errorCode", "400");
                                context.setVariable("description", "Incorrect startEffectiveDate. You have to write a future date");
                                context.setVariable("verifyDate", "false");
                        }else{
                            context.setVariable("startEffectiveDate", startEffectiveDate);
                        }
                    }
                    
                    
                    if(scheduleDate !== 'undefined' && scheduleDate !== null && scheduleDate !== "" ){
                        scheduleDate = scheduleDate.toString();
                        scheduleDate = moment(scheduleDate, formatDateBSS).format(formatDateBSS);
                        if(startEffectiveDate !== 'undefined' && startEffectiveDate !== null && startEffectiveDate !== "" ){
                            if(startEffectiveDate < scheduleDate){
                                    context.setVariable("errorCode", "400");
                                    context.setVariable("description", "The startEffectiveDate shouldn't be before than scheduleDate");
                                    context.setVariable("verifyDate", "false");
                            }
                        }else{
                            context.setVariable("scheduleDate", scheduleDate);
                        }
                    }
                    
                    
                    if(expireEffectiveDate !== 'undefined' && expireEffectiveDate !== null && expireEffectiveDate !== "" ){
                        expireEffectiveDate = expireEffectiveDate.toString();
                        expireEffectiveDate = moment(expireEffectiveDate, formatDateBSS).format(formatDateBSS);
                        if(expireEffectiveDate < scheduleDate){
                                context.setVariable("errorCode", "400");
                                context.setVariable("description", "Incorrect expireEffectiveDate. The expireEffectiveDate shouldn't be before than scheduleDate");
                                context.setVariable("verifyDate", "false");
                        }
                        if(expireEffectiveDate < startEffectiveDate){
                                context.setVariable("errorCode", "400");
                                context.setVariable("description", "Incorrect expireEffectiveDate. The expireEffectiveDate shouldn't be before than startEffectiveDate");
                                context.setVariable("verifyDate", "false");
                        }else{
                            context.setVariable("expireEffectiveDate", expireEffectiveDate);
                        }
                    }
                    
                    context.setVariable("hasEndDate", "true");
                }
            }
        }
        else if(startEffectiveDate || expireEffectiveDate){
            startEffectiveDate = "";
            expireEffectiveDate = "";
            context.setVariable("errorCode", "400");
            context.setVariable("description", "Invalid configuration. No apply the params 'startEffectiveDate'and 'expireEffectiveDate' with the offerings");
            context.setVariable("verifyDate", "false");
        }else{
            context.setVariable("isFIFF", "false");
        }
        
    }
}

function isValidDate(date){
     return moment(date, formatDateBSS).format(formatDateBSS);
    
}

function getRangeInDays(fechaStart, fechaEnd){
    
        var year = fechaStart.substr(0,4);
        var mes = fechaStart.substr(4,2);
        var dia = fechaStart.substr(6,2);
        
        var yearEnd = fechaEnd.substr(0,4);
        var mesEnd = fechaEnd.substr(4,2);
        var diaEnd = fechaEnd.substr(6,2);
        
        var fechaStartDate = new Date(year,mes-1,dia);
        var fechaEndDate = new Date(yearEnd,mesEnd-1,diaEnd);
    
    
    
    return ((fechaEndDate.getTime()-fechaStartDate.getTime() ) / 86400000);

}

