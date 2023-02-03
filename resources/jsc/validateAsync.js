 try{
    //Solamente para pruebas
    //context.setVariable('apigee.developer.app.name', "aws_batch")
    
    var async_value = context.getVariable('async');
    
    if(async_value === "true"){
        context.setVariable('async', "true");
    }else if(async_value === "false" || async_value === null){
        context.setVariable('async', "false");
    }else{
        context.setVariable('async', "error");
        context.setVariable('errorMessage.code', "400");
        context.setVariable('errorMessage.message', "the value of async must be true|false");
        context.setVariable('errorMessage.status', "400");
    }
}catch(e){
    context.setVariable('async', "error");
}