var whiteList = context.getVariable("whiteList");

if(whiteList === "yes"){
    context.setVariable("whiteList", "true");
}else{
    context.setVariable("whiteList", "false");
}