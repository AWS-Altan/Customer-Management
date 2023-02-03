 var response = context.getVariable("response.content");
 var auditorData = {};
 var isValidResponse = "false";
 var statusCode = context.getVariable("response.status.code");
 statusCode = (typeof(statusCode) === 'undefined' || statusCode === null || statusCode === "") ? "Unknown" : statusCode.toString();
 auditorData.code = statusCode;
print(typeof(response));
 try{
     response = JSON.parse(response);
 }catch(error){
     
     print("Error: " + error);
     response = "";
 }
 
 if(response === ""){
    auditorData.payload = "The response content is empty or it is not a json";
 }else{
    auditorData.payload = response;
    isValidResponse = "true";
 }
 
 context.setVariable("Auditor.data", JSON.stringify(auditorData));
 context.setVariable("isValidResponse", isValidResponse);
 context.setVariable("statusCode", statusCode);