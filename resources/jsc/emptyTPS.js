var tps = context.getVariable("tps");

if (typeof(tps) !== 'undefined' && tps !== null && tps !== "" ) {
    context.setVariable("tps", tps); 
}
else{
    tps = "1200pm";
    context.setVariable("tps", tps);
}