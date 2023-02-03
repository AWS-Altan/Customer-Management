var changePrimeryOfferOrderId = context.getVariable("cpo.orderId");
var orderIdFromDate = '';
var d = new Date();
var secondsAsNumber = d.getSeconds();
var minutesAsNumber = d.getMinutes();
var hoursAsNumber = d.getHours();
var dayAsNumber = d.getDate();
var monthAsNumber = d.getMonth()+1;

secondsAsNumber = (typeof(secondsAsNumber) == 'number')? secondsAsNumber.toString(): secondsAsNumber;
minutesAsNumber = (typeof(minutesAsNumber) == 'number')? minutesAsNumber.toString(): minutesAsNumber;
hoursAsNumber = (typeof(hoursAsNumber) == 'number')? hoursAsNumber.toString(): hoursAsNumber;
dayAsNumber = (typeof(dayAsNumber) == 'number')? dayAsNumber.toString(): dayAsNumber;
monthAsNumber = (typeof(monthAsNumber) == 'number')? monthAsNumber.toString(): monthAsNumber;

var month = (monthAsNumber.length>1)?monthAsNumber.substring(1,2):monthAsNumber;
var day = (dayAsNumber.length>1)?dayAsNumber.substring(1,2):dayAsNumber;
var hour = (hoursAsNumber.length>1)?hoursAsNumber:'0'+hoursAsNumber;
var minute = (minutesAsNumber.length>1)?minutesAsNumber:'0'+minutesAsNumber;
var second = (secondsAsNumber.length>1)?secondsAsNumber:'0'+secondsAsNumber;

orderIdFromDate = '9'+month+day+hour+minute+second;

var changePrimaryOrderIdFromJs = ((typeof(changePrimeryOfferOrderId) !== undefined && changePrimeryOfferOrderId !== null && changePrimeryOfferOrderId !==  ""))?changePrimeryOfferOrderId:orderIdFromDate;

changePrimaryOrderIdFromJs = (typeof(changePrimeryOfferOrderId)=='string')?parseInt(changePrimaryOrderIdFromJs):changePrimaryOrderIdFromJs

context.setVariable("changePrimaryOrderIdFromJs", changePrimaryOrderIdFromJs);
