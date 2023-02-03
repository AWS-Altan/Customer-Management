var aplicaPromoDefault = (typeof(context.getVariable('responseCatalogPromotions.aplicaPromoDefault')) === 'undefined' || context.getVariable('responseCatalogPromotions.aplicaPromoDefault') === null || context.getVariable('responseCatalogPromotions.aplicaPromoDefault') === "" || context.getVariable('responseCatalogPromotions.aplicaPromoDefault') == "None" || context.getVariable('responseCatalogPromotions.aplicaPromoDefault') == "SI")?'SI':'NO';
var purchaseConventionalBonus = 'true';
 
if(aplicaPromoDefault == 'NO'){
    purchaseConventionalBonus = 'false';
}
 
context.setVariable('purchaseConventionalBonus', purchaseConventionalBonus);
