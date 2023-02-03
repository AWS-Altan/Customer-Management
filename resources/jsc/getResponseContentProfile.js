  var response = context.getVariable("response.content");
 var responseObject = JSON.parse(response);
 var profileResponse = responseObject.responseSubscriber;
 context.setVariable("profileResponse", JSON.stringify(profileResponse));
 print("profileResponse:"+JSON.stringify(profileResponse));
 //print("TypeResponse: "+ typeof(response));
 //print("TypeResponseProfile: "+ typeof(profileResponse));