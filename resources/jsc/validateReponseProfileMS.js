 var auditorData = {};
 var statusCode = context.getVariable("response.status.code");
 var content = JSON.parse(context.getVariable("response.content"));
 print(typeof(content));
 statusCode = (typeof(statusCode) === 'undefined' || statusCode === null || statusCode === "") ? "Unknown" : statusCode.toString();
 auditorData.code = statusCode;
 
 if(statusCode != "200" && statusCode != "400"){
    auditorData.payload = "Invalid statusCode: "+statusCode+" ,The response content is empty or it is not a json";
 }

 
 if(statusCode == "400"){
    auditorData.payload = "Invalid statusCode: "+statusCode+" ,"+content.error;
    context.setVariable("errorTextProfileMS", content.error);
 }
 
 context.setVariable("Auditor.data", JSON.stringify(auditorData));
 context.setVariable("statusCodeProfileMS", statusCode);