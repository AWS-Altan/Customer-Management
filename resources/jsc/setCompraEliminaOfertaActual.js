 var operation = context.getVariable("operation");
 var compraEliminaOfertaActual="NO";
 
 if( operation == "COMPRA"){
     
     var purchaseConventionalBonus = context.getVariable('purchaseConventionalBonus');
     
     if(purchaseConventionalBonus == "true"){
        var ported = context.getVariable('responseControlPromotions.ported');
        if (ported == 'SI'){
            print("COMPRA FROM PORT-IN");
            //TODO STR             
            //compraEliminaOfertaActual = context.getVariable('responseRecentlyAssociatedPurchase.compraEliminaOfertaActual'); 
            compraEliminaOfertaActual=(typeof(context.getVariable('responseRecentlyAssociatedPurchase.compraEliminaOfertaActual')) === 'undefined' || context.getVariable('responseRecentlyAssociatedPurchase.compraEliminaOfertaActual') === null || context.getVariable('responseRecentlyAssociatedPurchase.compraEliminaOfertaActual') === "" || context.getVariable('responseRecentlyAssociatedPurchase.compraEliminaOfertaActual') === "None")?'NO':context.getVariable('responseRecentlyAssociatedPurchase.compraEliminaOfertaActual');
        }else{
            print("COMPRA");
            //compraEliminaOfertaActual = context.getVariable('responseCatalogPromotions.compraEliminaOfertaActual'); 
            compraEliminaOfertaActual=(typeof(context.getVariable('responseCatalogPromotions.compraEliminaOfertaActual')) === 'undefined' || context.getVariable('responseCatalogPromotions.compraEliminaOfertaActual') === null || context.getVariable('responseCatalogPromotions.compraEliminaOfertaActual') === "" || context.getVariable('responseCatalogPromotions.compraEliminaOfertaActual') === "None")?'NO':context.getVariable('responseCatalogPromotions.compraEliminaOfertaActual');
        }
            
     }else{
        print("OTRA OPERACION");
        //compraEliminaOfertaActual = context.getVariable('responseCatalogPromotions.compraEliminaOfertaActual'); 
        compraEliminaOfertaActual=(typeof(context.getVariable('responseCatalogPromotions.compraEliminaOfertaActual')) === 'undefined' || context.getVariable('responseCatalogPromotions.compraEliminaOfertaActual') === null || context.getVariable('responseCatalogPromotions.compraEliminaOfertaActual') === "" || context.getVariable('responseCatalogPromotions.compraEliminaOfertaActual') === "None")?'NO':context.getVariable('responseCatalogPromotions.compraEliminaOfertaActual');
     }
     
 }else{
    //compraEliminaOfertaActual = context.getVariable('responseCatalogPromotions.compraEliminaOfertaActual'); 
    compraEliminaOfertaActual=(typeof(context.getVariable('responseCatalogPromotions.compraEliminaOfertaActual')) === 'undefined' || context.getVariable('responseCatalogPromotions.compraEliminaOfertaActual') === null || context.getVariable('responseCatalogPromotions.compraEliminaOfertaActual') === "" || context.getVariable('responseCatalogPromotions.compraEliminaOfertaActual') === "None")?'NO':context.getVariable('responseCatalogPromotions.compraEliminaOfertaActual');
 }
 
 
context.setVariable('compraEliminaOfertaActual', compraEliminaOfertaActual);