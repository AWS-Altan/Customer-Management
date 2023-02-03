var product = context.getVariable("product");
print("product::"+ product+";");
var imei=context.getVariable("imei");
  
  
  if (typeof(imei) == 'string' && imei.length  > 12){
	  print('imei encontrado de tipo string');
	  context.setVariable("imeiFromFinalResponse", imei);
  
  }else if(typeof(imei) !== 'undefined' && imei !== null && imei !== ""){
      print("imei encontrado");
      context.setVariable("imeiFromFinalResponse", imei);
  }else{
      print("imei vacio");
    context.setVariable("imeiFromFinalResponse", "");
  }   

  if(typeof(product) !== 'undefined' && product !== null && product !== ""){
    print("With product::"+ product + ";");
    context.setVariable("productFromFinalResponse", product );
       
  }
  //else{
  //      print("Without product");
  //}   context.setVariable("productFromFinalResponse", "");

 
