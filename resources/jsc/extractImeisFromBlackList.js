var data = context.getVariable("responseBlackList.objects");
var identifiers = [];
var newData = JSON.parse(data);

for( var x=0; x < newData.length; x++){
identifiers[x] = newData[x].identifier;
}

context.setVariable("identifiers", JSON.stringify(identifiers));
