var responseContent = context.getVariable("response.content");
var respHttpStatusCode = context.getVariable("response.status.code");
var statusCode = responseContent.statusCode;
var auditorData = {};
var objResponseContent =JSON.parse(responseContent);
var respContentStatusCode = objResponseContent.statusCode;
var isValidResponse = (typeof(respContentStatusCode) === 'undefined') ? "true" : ( respContentStatusCode >= 400 ? "false" : "true" );

auditorData.code = statusCode;
auditorData.payload = (typeof(responseContent) === 'undefined' || responseContent === null || responseContent === "") ? "The response content is empty or it is not a json" : responseContent;
context.setVariable("Auditor.data", JSON.stringify(auditorData));
context.setVariable("isValidResponse", isValidResponse);
context.setVariable("respHttpStatusCode", respHttpStatusCode);
context.setVariable("respContentStatusCode", respContentStatusCode);