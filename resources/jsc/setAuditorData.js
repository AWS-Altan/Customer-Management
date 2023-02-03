var response = context.getVariable("response.content");

if(response !== "" && response !== null){
    context.setVariable("Auditor.data",response);
    
}else{
    context.setVariable("Auditor.data","{}");
}