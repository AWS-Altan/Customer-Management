var tps = context.getVariable("tps");
var proxyPathsuffix  = context.getVariable("proxy.pathsuffix");


if(    proxyPathsuffix.includes("/products/purchase")
    || proxyPathsuffix.includes("/products/validatePromotion")
  ){
    print("valor default para compra or promotion:: " + proxyPathsuffix );
    tps="7000pm";
    context.setVariable("tps", tps); 
    print("valor default para compra or promotion::" + tps);
}else if (typeof(tps) !== 'undefined' && tps !== null && tps !== "" ) {
    print("valor devapp");
    context.setVariable("tps", tps); 
}
else{
    print("valor default");
    tps = "1200pm";
    context.setVariable("tps", tps);
}