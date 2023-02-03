context.setVariable("request.header.TransactionId",context.getVariable("transactionId"));
var profileVersion = context.getVariable("profileVersion");
var profileVersionMS = parseInt(profileVersion,10) == 2 ? 1 : 0 ;
print("profileVersionClasic: "+profileVersion+" || profileVersionMS: "+profileVersionMS.toString());
context.setVariable("profileVersionMSF",profileVersionMS.toString());
