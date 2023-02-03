var scheduleDate = context.getVariable("scheduleDate");
var formatDate = "YYYYMMDD";
var today = moment().tz("America/Mexico_City").format("YYYYMMDD");

if(scheduleDate !== 'undefined')  {
    if(scheduleDate === null || scheduleDate === ""  || scheduleDate == today){
        context.setVariable("validateRefactorScheduleDate", "false");
    }
    else{
        context.setVariable("validateRefactorScheduleDate", "true");
    }
}