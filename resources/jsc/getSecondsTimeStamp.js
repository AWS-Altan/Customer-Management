var d = new Date();
var seconds = parseInt(d.getSeconds(),10);
var goToCatchingResponse = goToCatching(seconds);

context.setVariable("timestamp_seconds", seconds);
context.setVariable("goToCatchingResponse", Boolean(goToCatchingResponse));

print("timestamp_seconds: "+seconds)
print("goToCatchingResponse: "+goToCatchingResponse)


function goToCatching(seconds){  
    var isValid = (seconds > 5 && seconds < 55)?1:0;
    return isValid;
}