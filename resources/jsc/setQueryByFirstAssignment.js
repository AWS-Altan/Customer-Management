var firstPurchaseEvent= context.getVariable('responseCatalogPromotions.evento');
context.setVariable('firstPurchaseEvent', firstPurchaseEvent);

if( firstPurchaseEvent!="PORT-IN"){
    context.setVariable('queryByFirstAssignment', "false");
}else{
    context.setVariable('queryByFirstAssignment', "true");
}