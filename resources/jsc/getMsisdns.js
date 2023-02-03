var msisdns = context.getVariable("msisdns");

getMsisdns(msisdns);

function getMsisdns(msisdns){
    
    try{
        
        msisdns = msisdns.split(",");
        
        if(!msisdns.some(isNaN)){
            if(msisdns.length > 5){
                context.setVariable("validator.code", "400");
                context.setVariable("validator.message", "You can only send up to 5 msisdns.");
                context.setVariable("isArrayValid", "false");
            }else{
                for (var i = 0; i < msisdns.length; i++) {
                    msisdns[i].toString();
                    msisdns[i] = msisdns[i].trim();
                }
                context.setVariable("msisdns", JSON.stringify(msisdns));
            }
            
        }else{
            context.setVariable("validator.code", "E-001");
            context.setVariable("validator.message", "Incorrect data pattern in msisdns.");
            context.setVariable("isArrayValid", "false");
        }
        
    }catch(e){
        context.setVariable("validator.code", "E-001");
            context.setVariable("validator.message", "Incorrect data pattern in msisdns.");
            context.setVariable("isArrayValid", "false");
    }
    
}