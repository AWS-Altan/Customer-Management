var startEffectiveDate = context.getVariable("startEffectiveDate");
var formatDate = "YYYYMMDDHHmmss";
var format = "YYYYMMDD";
var today = moment().tz("America/Mexico_City").format(format);


if( typeof(startEffectiveDate) !== 'undefined' && startEffectiveDate !== null && startEffectiveDate !== "" ){
    startEffectiveDate = moment(startEffectiveDate, format).format(format);
    if(startEffectiveDate === today){
        today = moment().tz("America/Mexico_City").format(formatDate);
        context.setVariable("activeMode", "0");
        context.setVariable("startDate", today);
    }else{
        startEffectiveDate = moment(startEffectiveDate, formatDate).format(formatDate);
        context.setVariable("activeMode", "2");
        context.setVariable("startDate", startEffectiveDate);
    }
}else{
    today = moment().tz("America/Mexico_City").format(formatDate);
    context.setVariable("activeMode", "0");
    context.setVariable("startDate", today);
}