 var jsonResponse = context.getVariable("response.content");

var objToResponse = buildResponse(jsonResponse);
context.setVariable("response.content", JSON.stringify(objToResponse));


function buildResponse(response){
    var objResponse = {};
    var objParsed;
    try{
        objParsed = JSON.parse(jsonResponse);
        if ( objParsed.DN ){
            objResponse.msisdn = objParsed.DN;
        }
        
        if ( objParsed.CR ){
            objResponse.cr = objParsed.CR;
        }
        
        if ( objParsed.IDA ){
            objResponse.ida = objParsed.IDA;
        }
        
        if ( objParsed.MPP ){
            objResponse.type = objParsed.MPP == "S" ? "MPP" : "CPP"
        }
        
    }catch(e){
        print(e);
    }
    return objResponse;
}