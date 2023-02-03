var authorizedBlocker = context.getVariable("authorizedBlocker");
var dev_app_name = context.getVariable("apigee.developer.app.name");
var securityOrder = context.getVariable("securityOrder");

if(authorizedBlocker === "Authorized" || (dev_app_name === "aws_batch" && securityOrder === "1")){
    context.setVariable("authorizedBlocker", "Authorized");
}else{
    context.setVariable("authorizedBlocker", "Unauthorized");
}