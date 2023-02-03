var tam = context.getVariable("request.header.Content-Length");
if(tam < 10485760){
    context.setVariable("tamOk", true);
} else {
    context.setVariable("tamOk", false);
}

var operation = context.getVariable("operacion");

if (operation == "suspends" || operation == "reactivates" || operation == "deactivates" || operation == "resumes" || operation == "predeactivates" || operation == "profiles"
    || operation == "locks" || operation =="unlocks" || operation =="removes"){
    var ultima = operation.length;
    var operation = operation.substr(0, ultima-1);
    context.setVariable("operacion", operation);
}

if(operation == "changesprimary"){
    context.setVariable("operacion", "changeprimary");
}

if(operation == "changesSIM"){
    context.setVariable("operacion", "changesim");
}


if(operation == "purchasessupplementary"){
    context.setVariable("operacion", "purchasesupplementary");
}

if(operation == "changeslinking"){
    context.setVariable("operacion", "changevinculacion");
}

if(operation == "activations"){
    context.setVariable("operacion", "activate");
}

if(operation == "barrings"){
    context.setVariable("operacion", "Barring");
}

if(operation == "unbarrings"){
    context.setVariable("operacion", "Unbarring");
}

if(operation == "cancelproducts"){
    context.setVariable("operacion", "CancelSupplementary");
}

if(operation == "reactivatesbss"){
    context.setVariable("operacion", "ReactiveBSS");
}

if(operation == "predeactivatesbss"){
    context.setVariable("operacion", "PredeactiveBSS");
}

if(operation == "changesmsisdn"){
    context.setVariable("operacion", "ChangeMsisdnC");
}

if(operation == "preregistrations"){
    context.setVariable("operacion", "preregistered");
}

if(operation == "inclusion-white-lists"){
    context.setVariable("operacion", "inclusionWhiteListBarring");
}

if(operation == "exclusion-white-lists"){
    context.setVariable("operacion", "exclusionWhiteListBarring");
}
