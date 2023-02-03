var startDate = context.getVariable("startDate");
var endDate= context.getVariable("endDate");
var formatDate = "YYYYMMDDHH";

startDate = startDate.toString();
startDate = moment(startDate, formatDate).format(formatDate);

endDate = endDate.toString();
endDate = moment(endDate, formatDate).format(formatDate);


    if(endDate <= startDate){
        context.setVariable("errorCode", "400");
        context.setVariable("description", "startDate can not be less than endDate ");
        context.setVariable("ValidateDate", "false");
    }
    else{
        context.setVariable("ValidateDate", "true");
    }